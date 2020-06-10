const { validate, ValidationError, Joi } = require('express-validation');
const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
 name: { type: String, required: true },
 price: { type: Number, required: true },
 category: { type: String, required: true },
 createdDate: { type: Date, required: true },
 updatedDate: { type: Date, required: true },
});

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

const Product = mongoose.model('Product', productSchema);

module.exports = {
    productValidation,
    Product
}
