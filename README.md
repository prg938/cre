### About package
A tool to bootstrap new Chrome extension using React + Webpack. Any changes in React code will automatically (re)generate extension in ```ext``` folder (see demo below)

![9533393](https://user-images.githubusercontent.com/7237762/229219190-41203d79-3fdd-46d4-90c7-335293099e3b.png)

[![Version npm](https://img.shields.io/npm/v/create-react-ext.svg?logo=npm)](https://www.npmjs.com/package/create-react-ext)

### Demo
![ezgif-2-a62f1dd185](https://user-images.githubusercontent.com/7237762/228644970-0afe67f8-413d-4ddf-a00c-7f8b52e5be04.gif)

### Usage
1. Create React project (using [create-react-app](https://create-react-app.dev) for example)
2. Install packages: **npm i create-react-ext @types/chrome**
3. Start project. Make sure ```localhost:3000``` is available 
4. Generate extension: **cd node_modules/create-react-ext && npm start** (it'll add ```ext``` folder)
5. Load the extension in Chrome from ```ext``` folder
6. Now you can make changes in React code or in ```ext/background.js, ext/manifest.json```. Changes will regenerate the extension in ```ext``` and auto-reload using ```chrome.runtime.reload``` or ```window.location.reload``` if extension is opened (see demo above)

### License
MIT License
