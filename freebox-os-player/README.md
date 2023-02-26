# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# CORS
there are 6 ways to do this in React,

number 1 and 2 and 3 are the best:

1-config CORS in the Server-Side

2-set headers manually like this:

resonse_object.header("Access-Control-Allow-Origin", "*");
resonse_object.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
3-config NGINX for proxy_pass which is explained here.

4-bypass the Cross-Origin-Policy with chrom extension(only for development and not recommended !)

5-bypass the cross-origin-policy with URL bellow(only for development)

"https://cors-anywhere.herokuapp.com/{type_your_url_here}"
6-use proxy in your package.json file:(only for development)

if this is your API: http://45.456.200.5:7000/api/profile/

add this part in your package.json file: "proxy": "http://45.456.200.5:7000/",

and then make your request with the next parts of the api:

React.useEffect(() => {
axios
.get('api/profile/')
.then(function (response) {
console.log(response);
})
.catch(function (error) {
console.log(error);
});
});