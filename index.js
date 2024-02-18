const express = require('express');
const app = express();
const port = 3000;
const path = require('path'); //a module from node.js to help work with file and directories
const mongoose = require('mongoose');
const Product = require('./models/product');
const bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy']

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
    //console.log('DB is accessible')
}

app.set('views', path.join(__dirname, 'views')) //'__dirname' return path of process.cwd() and path.join helps in joining it with the views directory.
//Provides us power to run file from any directory
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
}) // The above code is used to create a server at port 3000 via express

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category }) //as returning data from db takes time
        res.render('products/index', { products, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})
app.get('/products/newproduct', (req, res) => {
    res.render('products/newProduct', { categories })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/productDetails', { product })
})

app.post('/products', async (req, res) => {
    //req.body only accessable after parsing
    const addedproduct = new Product(req.body)
    await addedproduct.save()
    res.redirect(`/products/${addedproduct._id}`)
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/editProduct', { product, categories })
})

//using method override for the put request
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id)
    res.redirect(`/products`)
})

