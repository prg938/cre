### About package
A tool to (re)generate Chrome extension from React & Webpack project. So any changes in your React code will automatically (re)generate extension in ```ext``` folder no matter how many changes you made (see demo below)

![icon](https://user-images.githubusercontent.com/7237762/222456904-638c8422-32b9-4b81-9632-2a009188cb8f.png)

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
