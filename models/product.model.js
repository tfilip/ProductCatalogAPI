const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
 name: { type: String, required: true },
 price: { type: Number, required: true },
 category: { type: String, required: true },
 createdDate: { type: Date, required: true },
 updatedDate: { type: Date, required: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
