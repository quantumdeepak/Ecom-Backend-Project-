const user_model = require('../models/user.model');
const jwt = require('jsonwebtoken');
const auth_config = require('../configs/auth.config');

// Create a middleware to check if the request body is proper and correct

const  varify_signup_body = (req, res, next) => {
    try{
        // 1. check for the name
        if(!req.body.name){
            return res.status(400).send({message: 'Name is required'});
        }

        // 2. check for the email
        if(!req.body.email){
            return res.status(400).send({message: 'Email is required'});
        }
        // 3. check for the userId
        if(!req.body.userId){
            return res.status(400).send({message: 'userId is required'});
        }
        // 4. check for the userType
        if(!req.body.userType){
            return res.status(400).send({message: 'userType is required'});
        }
        // 5. check for the password
        if(!req.body.password){
            return res.status(400).send({message: 'password is required'});
        }



        // 6. check for the same name
        const user = user_model.findOne({name: req.body.name});
        if(user){
            return res.status(400).send({message: 'Name already exists'});
        }

        // 7. check for the same email
        const user_email = user_model.findOne({email: req.body.email});
        if(user_email){
            return res.status(400).send({message: 'Email already exists'});
        }

        // 8. check for the same userId
        const user_userId = user_model.findOne({userId: req.body.userId});
        if(user_userId){
            return res.status(400).send({message: 'userId already exists'});
        }

        // 9. onely CUSTOMER is allowed to create the user
        if(req.body.userType !== 'CUSTOMER'){
            return res.status(400).send({message: 'Only CUSTOMER is allowed to create the user'});
        }

    }
    catch(err){
        console.log('Error while velidating the request Object', err);
        res.status(500).send({message: 'Internal server error Error while velidating the request Object'});
    }
}


const varify_signin_body = (req, res, next) =>{
    if(!req.body.userId){
        return res.status(400).send({message: 'userId is required'});
    }
    if(!req.body.password){
        return res.status(400).send({message: 'password is required'});
    }
    next();
}




const verify_token = (req, res, next) => {
    // 1. Check if the token is present in the header
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ message: 'Token is required' });
    }

    // 2. Verify if the token is valid
    jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }

        // 3. Check if the user exists in the database
        try {
            const user = await user_model.findById(decoded.id);
            if (!user) {
                return res.status(401).send({ message: 'User not found' });
            }
            
            // If everything is fine, proceed to the next middleware or route handler
            req.user = user; // Optionally attach user to the request object for later use
            // Set thte user in the request object
            req.user = user;
            next();
        } catch (dbError) {
            console.error('Error while verifying user:', dbError);
            return res.status(500).send({ message: 'Internal server error' });
        }
    });
};


const is_admin = (req, res, next) => {
    const user = req.user;
    if(user.userType !== 'ADMIN'){
        return res.status(403).send({message: 'Only ADMIN is allowed to perform this operation'});
    }else{
        next();
    }
}

// const is_admin = (req, res, next) => {
//     if(req.user.userType !== 'ADMIN'){
//         return res.status(403).send({message: 'Only ADMIN is allowed to perform this operation'});
//     }
//     next();
// }

// module.exports = varify_sighup_body;

module.exports = {
    varify_signup_body : varify_signup_body,
    varify_signin_body : varify_signin_body,
    verify_token : verify_token,
    is_admin : is_admin
}