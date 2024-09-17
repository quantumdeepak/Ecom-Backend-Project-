// 

/*  
*Controller for controling the category routes
*POST: localhost:8888/ecom/api/v1/categories

{
    "name": "Electronics",
    "description": "All electronic items"
}

*/

const category_model = require('../models/category.model');


exports.create_new_category = async (req, res) => {

    // Read the request body

    
    // create the category
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    // Add the category to the database

    try {
        const category = await category_model.create(cat_data);
        // res.status(201).send({message: 'Category created successfully', category: category});
        res.status(201).send(category);
    }catch(err) {
        console.log('Error while creating category', err);
        res.status(500).send({message: 'Internal server error while creating category'});
    }



    // Send the response back to the client
}