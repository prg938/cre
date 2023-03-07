
![icon](https://user-images.githubusercontent.com/7237762/222456904-638c8422-32b9-4b81-9632-2a009188cb8f.png)

[![Version npm](https://img.shields.io/npm/v/create-react-ext.svg?logo=npm)](https://www.npmjs.com/package/create-react-ext)

A tool to generate Chrome extension (manifest v3) using React & Webpack with manual and auto-update support

### How it works
Tool will watch for changes in **background.js** / **manifest.js** or in React project and auto-update extension with changed files

![ezgif-5-358bf05523](https://user-images.githubusercontent.com/7237762/223511720-f90ab417-c988-4858-90df-32ae6573439b.gif)

Manual reload:

![manual reload](https://user-images.githubusercontent.com/7237762/223502544-a7afefc3-cf47-4924-840f-34c2bcf55886.jpg)


### How to use
- Create React project (using [create-react-app](https://create-react-app.dev) for instance)
- Install ```create-react-ext```: **npm i create-react-ext**
- Install ```@types/chrome```: **npm i @types/chrome** (it'll add type definitions for Chrome extension development)
- Start project (**npm start** for instance). After that **webpack-dev-server must be launched at localhost:3000**
- Generate extension: **cd node_modules/create-react-ext && npm start** (it'll add ```ext``` folder in your project)
- Load this extension in Chrome from **ext** folder
- Work with React project. Work with **background.js** / **manifest.js**. Changes will automatically update the extension


### TODO:
* Terminate broken ws-connections?
* Use webpack build assets? currently used generated from webpack-dev-server


### License
MIT License