const mongoose = require('mongoose');

/**
    * User Schema
    * neme: String, required
    * email: String, required
    * password: String, required
    * userId: String, required
    * userType: String, required
 */

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minLength: 10
    },
    userType: {
        type: String,
        required: true,
        default: 'CUSTOMER',
        enum: ['CUSTOMER', 'ADMIN']
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true , versionKey: false});

module.exports = mongoose.model('User', UserSchema);

// mongoose.model('User', UserSchema) will create a collection named 'users' in the database.
// Please note that the collection name is always the plural form of the model name.

// Importan Note:
// the admin will be created by the developer and the customer will be created using the API.
