[![Netlify Status](https://api.netlify.com/api/v1/badges/0a6daaaa-56a2-4420-ad81-85817ea5c60c/deploy-status)](https://app.netlify.com/sites/cocky-dubinsky-62772c/deploys)

## Project Aim
Use `create-react-app` and the library `react-virtualized` to make an infinite-scrolling table displaying a big list of users.

The website [randomuser.me](randomuser.me) will generate you the list that you can use. For example https://randomuser.me/api/?results=10&seed=abc will give you a page of 10 randomly generated users. We add a `seed` so when we fetch another page of results (https://randomuser.me/api/?page=2&results=10&seed=abc), we’re drawing from the same random pool.

## Running Locally
Clone this repository and run `npm install` to install any dependencies. `npm start`runs the app in the development mode. `npm run build` will build the app for production into the /build folder.
