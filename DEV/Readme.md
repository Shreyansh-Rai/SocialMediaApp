## Implementation details for future reference : 
### Install Packages and run npm init for making package.json and package lock 
### The Type has been set to module in the package Json to allow import statements to import modules instead of require.
### Prep MongoDB cloud db for connecting via local
### create .env for the port and the MONGO_URL
### start server index.js : Read index js for heavily commented code and verify MONGOOSE
#### Future TroubleShooting : encode the passwords in the env. special characters need to be replaced by their ascii values.
### create routes and controllers to execute functions on those routes. tackle routes starting from register on the index.js since that requires disk storage access from multer so needs the upload variable over there and then continue and create the register controller. This should be followed by the login controller and then move to the middle ware for token verification. we offer the user a token after he supplies the password so to make sure that he can use that token and get it verified to access all the endpoints of backend. also make sure to use async and await in bcrypt and mongo access.
#### Very simple in essence 1) Create Route 2) Create Controllers with CRUD capabilities depending on the needs. done.

### We now get started with the front end with create react app.
#### Over on the front end side of things, we will first setup the routes in our app and then setup the state of the appliction. I have used redux over here to maintain the global state of things, instead of constantly passing stuff to the various components, redux toolkit will allow a global state and starting from some initial state and given an action, you can use a reducer to jump to the next state.
#### Post that start the login page and formik + yup for teh form and validation. this allows you to get the data to the backend end points, that will create the user if register func, else return the created user after fetching him from the database if the user is a valid one ie email and password are correct that is already being handled by the controller that lives over there on that route.