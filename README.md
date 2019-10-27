# Wallakeep


## Introduction
Wallakeep is a simple Single Page Application (SPA) made with React that emulates an advert selling /buying webpage. It contains a first login, a home page where you can filter by name, price, tag or type (buy, sell) and see rendered the adverts, also you can edit or create new adverts. 

On the edit-create page you can see a preview and check what your advert will look like.

Wallakeep has been developed under the 'mobile first' premise.

## Requirements and dependencies

* Node and Node Package Manager (NPM)
* React
* Bootstrap
* MongoDB

An important requirement is the API that is consumed by the SPA. Credits to [Ismael](https://github.com/IsmaelB83) to share it. The link of this API is the next one:

https://github.com/IsmaelB83/keepcoding-backend-node

## Set up

Set up this project is easy, you could use it without the API, but you would have not any `tag` and, basically, you could do "nothing".

Under this, you have some instructions to follow and have the project running:

### Server

* Clone the repo on the previous link.
* Make sure you have MongoDB installed and running
* On the API folder, download all the dependencies with `npm install` command.
* Fill DB with some adverts using `npm init` command.
* Finally, start the API with `npm start`

The API will be launched under the `http://localhost:3001`

### Front 

* Clone this repo.
* Download all the dependencies with `npm install` command.
* Use the `npm start` command to run the project in the development mode.
* Use the `npm run build` command to run run the project in the production mode. The `Error boundary` will work perfect in this mode.

When `npm start` is done, a new web page will open under the `http://localhost:3000` URL.

## Development notes

I changed all the `componentWillMount()` by `componentDidMount()` because Console was returning a lot of warnings. The content of this method can be included inside `componentDidMount()` or in the component constructor.

On the other hand, `componentWillReceiveProps` was replaced by `UNSAFE_componentWillReceiveProps`. How ever, React recommends to change this method with `static getDerivedStateFromProps()`. In the future, this methods have to be replaced by the recommended one.

## Keep learning more 

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
