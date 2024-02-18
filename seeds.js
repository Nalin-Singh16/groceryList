const express = require('express');
const app = express();
const port = 3000;
const path = require('path'); //a module from node.js to help work with file and directories
const mongoose = require('mongoose');
const Product = require('./models/product');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/shopApp');
    console.log('DB is accessible')
}

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 120,
//     category: 'fruit'
// }) //creating an instance of model and seeding our db

// p.save() //returns a promise, used so updated data is returned to console
//     .then(p => { console.log(p) })
//     .catch(e => { console.log(e) })

const productSeedData = [
    {
        name: 'Ruby Grapefruit',
        price: 120,
        category: 'fruit'
    },
    {
        name: 'Red Bell Pepper',
        price: 80,
        category: 'Vegetable'
    },
    {
        name: 'Cow Milk',
        price: 60,
        category: 'Dairy'
    },
    {
        name: 'Hass Avocado',
        price: 150,
        category: 'fruit'
    },
    {
        name: 'Kale',
        price: 100,
        category: 'Vegetable'
    },
    {
        name: 'Cottage Cheese',
        price: 140,
        category: 'Dairy'
    }
];
// in case of insert.Many if even one fails validation, nothing goes to DB
Product.insertMany(productSeedData)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

