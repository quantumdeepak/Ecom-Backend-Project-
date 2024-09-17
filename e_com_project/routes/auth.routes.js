// this is for the authentication routes


const auth_controller = require('../controllers/auth.controller');


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
    app.post('/ecom/api/v1/auth/signup', auth_controller.signup);
} 