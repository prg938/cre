
![icon](https://user-images.githubusercontent.com/7237762/222456904-638c8422-32b9-4b81-9632-2a009188cb8f.png)

[![Version npm](https://img.shields.io/npm/v/create-react-ext.svg?logo=npm)](https://www.npmjs.com/package/create-react-ext)

A tool to generate Chrome extension using React & Webpack with auto-update support

### Manifest
This tool generates **manifest v3. Manifest v<3** won't be supported by Google developers


### How to use
- Create React project (using [create-react-app](https://create-react-app.dev) for instance)
- Install ```create-react-ext```: **npm i create-react-ext**
- Install ```@types/chrome```: **npm i @types/chrome** (it'll add type definitions for Chrome extension development)
- Start project (**npm start** for instance). After that **webpack-dev-server must be launched at localhost:3000**
- Generate extension: **cd node_modules/create-react-ext && npm init** (it'll add ```ext``` folder in your project)
- Load this extension in Chrome from **ext** folder
- Work with React project. Work with **background.js** / **manifest.js**. Changes will update and reload the extension


### How it works
This tool generates chrome extension from React project. How?
* It'll create ```ext``` folder
* It'll generate in ```ext``` folder basic files like **background.js** / **manifest.js** / **icon.png**
* It'll generate in ```ext``` folder webpack assests **index.html** / **js-assets** from [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* Tool will watch for changes in **background.js** / **manifest.js** or in React project and reload extension with changed files



### TODO:
* Terminate broken ws-connections?
* Use webpack build assets in extension rather than generated from webpack-dev-server. It will omit redundant code and unneeded logs as well as errors
* Prevent background.js from caching. ```chrome.runtime.reload()``` sometimes works - sometimes not