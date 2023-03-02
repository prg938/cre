
import {normalize} from 'path'
import fetch from 'node-fetch'
import fs from 'fs'
import ansiRegex from 'ansi-regex'
import WebSocket, {WebSocketServer} from 'ws'

const {log, error} = console
const [OK, ERRORS] = ['ok', 'errors']
const [LOG1, LOG2] = ['Connected to webpack-dev-server', 'You should first connect to webpack-dev-server']
const scriptRE = /(\<script)([\s\S]+?)(src\s*=\s*)\"(.+?)\"([\s\S]*?\>)(\<\/script\>)/g
const bodyEndRE = /(\<\/body\>)/
const tmap = {'&': '&amp;', '<': '&lt;', '>': '&gt;'}
const escapeHTMLTags = str => str.replace(/[&<>]/g, tag => tmap[tag])
const stripAnsi = str => str.replace(ansiRegex(), '')
const AUTOUPDATESCRIPTTAG = '<script type="module" src="./auto-update.js"></script>'
const EXTRELOADTYPES = ['runtime', 'location']
const WATCHCONFIG = {interval: 1000}
const WSSPORT = 3137
const WDSWSHOST = 'ws://localhost:3000/sockjs-node'
const WDSHOST = 'http://localhost:3000'
const EXTPATH = '../../ext/'
const BGPATH = 'background.js'
const MANIFESTPATH = 'manifest.json'
const AUTOUPDATEPATH = 'auto-update.js'
const INDEXPATH = 'index.html'
const ICONPATH = 'icon.png'
const EXTBGPATH = EXTPATH + BGPATH
const EXTMANIFESTPATH = EXTPATH + MANIFESTPATH
const EXTAUTOUPDATEPATH = EXTPATH + AUTOUPDATEPATH
const EXTINDEXPATH = EXTPATH + INDEXPATH
const EXTICONPATH = EXTPATH + ICONPATH

const ws = new WebSocket(WDSWSHOST)
const wss = new WebSocketServer({port: WSSPORT})

const recursive = (list, callback, fn, index = 0) => {
	if (list[index]) {
		fn(list[index][0], list[index][1], () => recursive(list, callback, fn, ++index))
	}
	else callback()
}
const recursiveCopy = (list, callback) => recursive(list, callback, fs.copyFile.bind(fs))
const recursiveWrite = (list, callback) => recursive(list, callback, fs.writeFile.bind(fs))

const notifyExtension = message => {
	wss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message)
		}
	})
}

const startWatchers = () => {
	fs.watchFile(EXTBGPATH, WATCHCONFIG, () => {
		log('+' + BGPATH)
		notifyExtension(EXTRELOADTYPES[0])
	})
	fs.watchFile(EXTMANIFESTPATH, WATCHCONFIG, () => {
		log('+' + MANIFESTPATH)
		notifyExtension(EXTRELOADTYPES[0])
	})
}

const prepareErrorPage = errors => {
	fs.writeFile(EXTINDEXPATH, `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title></title>
				<style>
				  body {
						background-color: rgb(35, 39, 47);
						color: white;
					}
				</style>
			</head>
			<body>
				%ERRORS%
				%AUTOUPDATESCRIPT%
			</body>
		</html>`
		.replace('%AUTOUPDATESCRIPT%', AUTOUPDATESCRIPTTAG)
		.replace('%ERRORS%', '<pre>' + escapeHTMLTags(stripAnsi(errors)) + '</pre>'), () => notifyExtension(EXTRELOADTYPES[1]))
}

const prepareWebpackAssets = async () => {
	const pathMap = []
	const response = await fetch(WDSHOST)
	let page = await response.text()
	let i = 0

	page = page
		.replace(scriptRE, (_, CG1, CG2, CG3, old, CG5, CG6) => {
			const upd = `${i++}.js`
			pathMap.push({old, upd})
			return `${CG1}${CG2}${CG3}"${upd}"${CG5}${CG6}`
		})
		.replace(bodyEndRE, AUTOUPDATESCRIPTTAG + '$1')

	const responses = await Promise.all(pathMap.map(map => fetch(normalize(WDSHOST + '/' + map.old))))
	const scripts = await Promise.all(responses.map(response => response.text()))

	recursiveWrite(
		[...pathMap.map((map, index) => [EXTPATH + map.upd, scripts[index]]), [EXTINDEXPATH, page]],
		() => {
			log('+webpack')
			notifyExtension(EXTRELOADTYPES[1])
		}
	)
}

wss.on('connection', wsc => wsc.on('error', () => {}))

ws.on('error', () => {
	error(LOG2)
	process.exit()
})
ws.on('open', () => log(LOG1))

ws.on('message', data => {
	const payload = JSON.parse(data)
	switch (payload.type) {
		case OK:
			prepareWebpackAssets()
			break
		case ERRORS: 
			let errors = payload.data
			prepareErrorPage(errors[0])
			break
	}
})

fs.mkdir(EXTPATH, {recursive: false}, err => {
	if (err) {
		startWatchers()
	}
	else {
		recursiveCopy([
			[AUTOUPDATEPATH, EXTAUTOUPDATEPATH],
			[BGPATH, EXTBGPATH],
			[MANIFESTPATH, EXTMANIFESTPATH],
			[ICONPATH,  EXTICONPATH]],
			() => startWatchers()
		)
	}
})