// //  Will Write the controller logic for the authentication of the user


// const bcrypt = require('bcryptjs');
// const user_model = require('../models/user.model');

// // This method is used to create or register a new user

// // req is the request object that contains the user data
// // res is the response object that is used to send the response back to the user
// exports.signup = async (req, res) => {
//     // logic to create a new user

//     // 1. read the user body
//     const request_body = req.body;  // this will return request body in JSON format



//     // 2. Add the user to the database collection
//     const user_object = {
//         name: request_body.name,
//         email: request_body.email,
//         userId: request_body.userId,
//         userType: request_body.userType,
//         password: bcrypt.hashSync(request_body.password, 8)
//     }


//     try{
//         const user_created = await user_model.create(user_object);
//         console.log('User created successfully', user_created);
//         // Send the response back to the user
//         // res.status(201).send({message: 'User created successfully'});


        
//         res.status(201).send({user_created});

//     }catch(err){
//         console.log('Error while creating user', err);
//         res.status(500).send({message: 'Internal server error'});
//     }

//     // 3. Send the response back to the user
// }



const bcrypt = require('bcryptjs');
const user_model = require('../models/user.model');

// // This method is used to create or register a new user
// exports.signup = async (req, res) => {
//     // logic to create a new user

//     // 1. read the user body
//     const request_body = req.body;  // this will return request body in JSON format

//     // Validate that all required fields are present
//     if (!request_body.name || !request_body.email || !request_body.userId || !request_body.userType || !request_body.password) {
//         return res.status(400).send({ message: "All fields (name, email, userId, userType, password) are required" });
//     }

//     // 2. Add the user to the database collection
//     const user_object = {
//         name: request_body.name,
//         email: request_body.email,
//         userId: request_body.userId,
//         userType: request_body.userType,
//         password: bcrypt.hashSync(request_body.password, 8)  // Ensure password is valid
//     }

//     try {
//         const user_created = await user_model.create(user_object);
//         console.log('User created successfully', user_created);
        
//         // Send the response back to the user
//         res.status(201).send({ user_created });
//     } catch (err) {
//         console.log('Error while creating user', err);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// }


exports.signup = async (req, res) => {
    const request_body = req.body;

    console.log("Request body:", request_body);  // Log request body to check if it's received correctly

    if (!request_body.password) {
        console.log("Password missing");  // Log if password is missing
        return res.status(400).send({ message: "Password is required" });
    }

    const user_object = {
        name: request_body.name,
        email: request_body.email,
        userId: request_body.userId,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await user_model.create(user_object);
        console.log('User created successfully', user_created);
        const res_user = {
            name: user_created.name,
            email: user_created.email,
            userId: user_created.userId,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }
        res.status(201).send({ res_user });
    } catch (err) {
        console.log('Error while creating user', err);
        res.status(500).send({ message: 'Internal server error' });
    }
}
