const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.get('/', (req, res) => {
    res.send('Hi, NodeJs-CRUD-APP')
})

app.get('/blog', (req, res) => {
    res.send('Hi, Blog! My name is Anqur.')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update the product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete product by id
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:admin1234@cluster0.wmwma0b.mongodb.net/Node-CRUD-API')
.then(()=> {
    app.listen(3000, ()=>{
        console.log('node-crud-app is running on port 3000')
    })
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log(error)
})