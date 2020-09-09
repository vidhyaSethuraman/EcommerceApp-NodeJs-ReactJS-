var mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
    {
        
        id: {
            type: String,
            required:true
        },
        collectionName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required:true
        }

    }
)


const Product = mongoose.model('product', productSchema);

module.exports = Product;