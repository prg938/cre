### About package
CRE allows to generate new Chrome extension and use TypeScript and React

[![Version npm](https://img.shields.io/npm/v/create-react-ext.svg?logo=npm)](https://www.npmjs.com/package/create-react-ext)

### Usage
1. Create React project (using [create-react-app](https://create-react-app.dev) for example)
2. Install packages: **npm i create-react-ext @types/chrome**
3. Start project. Make sure ```localhost:3000``` is available 
4. Generate extension: **cd node_modules/create-react-ext && npm start** (it'll add ```ext``` folder)
5. Load the extension in Chrome from ```ext``` folder
6. Now you can make changes in React code or in ```ext/background.js, ext/manifest.json```. Changes will regenerate the extension in ```ext``` and auto-reload using ```chrome.runtime.reload``` or ```window.location.reload``` if extension is opened (see demo above)

Go to **index.tsx** entry point and define for example this component:

```ts
import {FC} from 'react'

const HiComponent = FC<{}> = () => {
  const style = {padding: '20px'}
  return (
    <div style={style}>Hi</div>
  )
}

export default HiComponent
```

Now we can open Chrome popup-window and we will see **Hi**. Let's change index.tsx:

```ts
const HiComponent = FC<{}> = () => {
  const style = {padding: '5px'}
  return (
    <div style={style}>Welcome <b>Dear Visitor</b></div>
  )
}
```

We will see **Welcome Dear Visitor text**. This is because CRE updates extension on any change. Now let's communicate with **background.js** using **chrome.runtime.sendMessage/onMessage** methods. And also update Badge using **chrome.action.setBadgeText** method. In **ext/background.js** we will add background logic:

```ts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'data') {
    // return simple object for simplicity
    sendResponse({
      content: 'hello from background.js',
      badge: '123'
    })
    return true
  }
})
```

And also update index.tsx:

```ts
import {useEffect, useState, FC} from 'react'

interface HiComponentStateType = {
  content: string
  badge: string
}

const HiComponent = FC<{}> = () => {
  const [state, setState] = useState<HiComponentStateType>({
    content: 'hello',
    badge: 0
  })
  useEffect(() => {
    chrome.runtime.sendMessage({type: 'data'}, (response) => {
      if (response) {
        const {content, badge} = response
        setState({content, badge})
        chrome.action.setBadgeText({text: badge})
      }
      else document.write('Cannot fetch data from background.js')
    })
  }, [])
  return (
    <div>{state.content}</div>
  )
}
```

In Chrome popup-window we will see hello from background.js text and badge set to **123**

### Conclusion
CRE is a simple tool that gives ability to:
Create default extension in ext folder
Use React/TypeScript
Automatically update extension in ext folder on any chandes in code
Simply load the extension in Google Chrome from ext folder



### License
MIT License
