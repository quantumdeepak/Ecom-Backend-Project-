// This is the starting file of the prject

const express = require('express');
// The Type of the express is function
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const user_model = require('./models/user.model');
const serverConfig = require('./configs/server.config');
const db_config = require('./configs/db.config');

const app = express();

// Create an admin user if not exists
// Make Connection with the database mongodb
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // If this is open event is fired then it means we're connected to the database
    // we're connected to the database!
    console.log('Connected to the database');
    // once the connection is established then we can define init
    fun_init();
});







// async function fun_init(){
//     let user = await user_model.findOne({userType: 'ADMIN'})

//     if(user){
//         console.log('Admin already exists');
//         return;
    
//     try{
//         user = await user_model.create({
//             name: 'Admin',
//             email: "some_random@email.com",
//             userId: 'admin_1',
//             userType: 'ADMIN',
//             password: bcrypt.hashSync('admin@123',8)
//             // hashSync is create hash synchronously and 8 id saltRounds
//         });
//         console.log('Admin user created successfully');

//     }
//     catch(err){
//         console.log('Error while creating admin user', err);
//     }
//     }
// }



async function fun_init(){
    let user = await user_model.findOne({userType: 'ADMIN'})

    if(user){
        console.log('Admin already exists');
        return;
    }
    
    try {
        user = await user_model.create({
            name: 'Admin',
            email: "some_random@email.com",
            userId: 'admin_1',
            userType: 'ADMIN',
            password: bcrypt.hashSync('admin@123',8)
        });
        console.log('Admin user created successfully');
    } catch(err) {
        console.log('Error while creating admin user', err);
    }
}


// Start the server
// this port number is custimized can be changed
// so will keep all such info in config folder
app.listen(serverConfig.PORT , ()=>{
    console.log('Server is running on port ' + serverConfig.PORT);
});