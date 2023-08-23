const { Schema, model } = require('mongoose')

const ProductSchema = new Schema(
    {
        ProductName: {
            type: String,
            unique: true,
            required: true
        },
        ProductImage: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
        ,
        price: {
            type: String,
            required: true
        }
    
    }
)

const Product = model('product', ProductSchema)
module.exports = Product