const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { validate, ValidationError, Joi } = require('express-validation')
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

let products = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Define the product item
const productValidation = {
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .required(),
        price: Joi.number()
            .required(),
        category: Joi.string()
            .min(3)
            .required(),
    }),
}


//Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

//  apply to all requests
app.use(limiter);

//Create a product
app.post('/product', validate(productValidation, {}, {}), (req, res) => {
    const product = req.body;
    product.id = products.length;
    product.createdDate = new Date();
    product.updatedDate = new Date();
    products.push(product);

    res.status(201).location(`/products/${product.id}`).send();
});

//Create a product
app.post('/product/:id', (req, res) => {
    if (products.find(p => p.id == req.params.id)) {
        //Not found
        res.status(409).send();
    } else {
        //Conflict -> resource exists
        res.status(404).send();
    }
});

//Read all products
app.get('/product', (req, res) => {
    res.status(200).json(products);;
});

//Read a product
app.get('/product/:id', (req, res) => {
    product = products.find(p => p.id == req.params.id);
    if (product) {
        res.status(200).json(product).send();;
    } else {
        //Not found
        res.status(404).send();
    }
});

//Update a product
app.put('/product', (req, res) => {
    //Not Allowed
    res.status(405).send();
});

//Update a product
app.put('/product/:id', validate(productValidation, {}, {}), (req, res) => {
    product = products.find(p => p.id == req.params.id);
    if (product) {
        product.updatedDate = new Date();
        product.name = req.body.name;
        product.price = req.body.price;
        product.category = req.body.category;
        res.status(204).send();
    } else {
        //Not found
        res.status(404).send();
    }
});


//Update a product
app.patch('/product', (req, res) => {
    //Not Allowed
    res.status(405).send();
});

//Update a product
app.patch('/product/:id', (req, res) => {
    product = products.find(p => p.id == req.params.id);
    if (product) {
        product.updatedDate = new Date();
        if (req.body.name) product.name = req.body.name;
        if (req.body.price) product.price = req.body.price;
        if (req.body.category) product.category = req.body.category;
        res.status(204).send();
    } else {
        //Not found
        res.status(404).send();
    }
});


//Delete a product
app.delete('/product', (req, res) => {
    //Not allowed
    res.status(405).send();
});

//Delete a product
app.delete('/product/:id', (req, res) => {
    let id = parseInt(req.params.id);
    initialLength = products.length;
    products = products.filter(p => p.id !== id);
    (initialLength === products.length) ? res.status(404).send()
        : res.status(200).send();
});

//Validation error
app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
});

app.listen(port, () => console.log(` Server listening on port ${port}!`));