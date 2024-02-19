const mongoose = require('mongoose');

const { Schema } = mongoose

const productSchema = new Schema({
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
    }, //embedding the farm id into product document
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm' //name of the model we will be establishing relation with
    }
})
// define a schema above (a type and validation template for document)

const Product = mongoose.model('Product', productSchema);
//created a model class called Product. In db a collection called products is formed.

module.exports = Product;