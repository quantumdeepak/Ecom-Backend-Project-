// Name of category
// Description of category


const mangoose = require('mongoose');

const categorySchema = new mangoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
},{timestamps: true, versionKey: false});

module.exports = mangoose.model('Category', categorySchema);

