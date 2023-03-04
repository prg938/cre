/* eslint-disable no-undef */

const wsc = new WebSocket('ws://localhost:3137')

wsc.onmessage = message => {
  const reloadType = message.data
  if (reloadType === 'runtime') chrome.runtime.reload()
  if (reloadType === 'location') this.window && this.window.location.reload()
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    "id": 'upd',
    "title": 'Reload',
    "contexts": ['action']
  })
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const id = info.menuItemId
  if (id === 'upd') {
    chrome.runtime.reload()
  }
})

export default wsc