const mongoose = require('mongoose');
//No need to connect to DB as we will be requiring the models in index.js

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})
// define a schema above (a type and validation template for document)

const Product = mongoose.model('Product', productSchema);
//created a model class called Product. In db a collection called products is formed.

module.exports = Product;