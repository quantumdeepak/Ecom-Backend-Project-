// this is for the authentication routes


const auth_controller = require('../controllers/auth.controller');
const authmw = require('../middlewares/auth.mw');

// the post request will be made to the /signup route
// we need to intercet the request and call the signup method from the controller



//  Our application  is running in the Express server
// the app object has controler of the server that is used to create the routes as the server created using app object

//  app ==> Route ==> Controller ==> Model
// Will use app object to define the route




module.exports = (app) =>{
    // the /signup is the url 
    // id the app makes the call at this uri then the appropriate controller method will be called or handed over

    // and the signup controller is defined in the auth.controller.js file
    // app.post('/signup', auth_controller.signup);
    app.post('/ecom/api/v1/auth/signup', [authmw.varify_signup_body] ,  auth_controller.signup);

    // Route for login
    app.post('/ecom/api/v1/auth/signin',[authmw.varify_signin_body], auth_controller.signin);

} 