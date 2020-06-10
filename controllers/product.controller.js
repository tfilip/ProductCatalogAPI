const app = require('express').Router();
const Product = require('../models/product.model');

//Create a product
app.post('/', (req, res) => {
    const product = req.body;
    product.createdDate = new Date();
    product.updatedDate = new Date();
    const newProduct = new Product(product);
    newProduct.save()
        .then(() => res.status(201).location(`/product/${newProduct._id}`).send())
        .catch(err => res.status(400).send(err));
});

//Create a product
app.post('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(() => res.status(404).send()) //Conflict -> resource exists
        .catch(() => res.status(409).send()); //Not found
});

//Read all products
app.get('/', (req, res) => {
    Product.find({}, (err, products) => res.status(200).json(products));
});

//Read a product
app.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            if(product){
                res.status(200).json(product);
            }else {
                res.status(404).send();
            }
        }) //Conflict -> resource exists
        .catch(() => res.status(404).send()); //Not found
});

//Update a product
app.put('/', (req, res) => {
    //Not Allowed
    res.status(405).send();
});

//Update a product
app.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id,
        { $set: { "name": req.body.name, "price": req.body.price, "category": req.body.category, "updatedDate": new Date() } },
        (err, result) => {
            if (result) res.status(204).send();
            else res.status(404).send(err);
        });
});


//Update a product
app.patch('/', (req, res) => {
    //Not Allowed
    res.status(405).send();
});

//Update a product
app.patch('/:id', (req, res) => {
    var updatedProduct = req.body;
    updatedProduct.updatedDate = new Date();
    Product.findByIdAndUpdate(req.params.id,
        { $set: updatedProduct },
        (err, result) => {
            if (result) res.status(204).send();
            else res.status(404).send(err);
        });
});


//Delete a product
app.delete('/', (req, res) => {
    //Not allowed
    res.status(405).send();
});

//Delete a product
app.delete('/:id', (req, res) => {
    Product.deleteOne({ _id: req.params.id }, (err, obj) => {
        if (!err && obj.deletedCount !== 0) res.status(200).send();
        else res.status(404).send();
    });
});


module.exports = app;