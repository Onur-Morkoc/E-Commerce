const mongoose = require("mongoose")

const productSchame = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price Cannot Exceed 8 Characters"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [8, "Stock Cannot Exceed 8 Characters"],
        default:1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
            },
            rating: {
                type: Number,
            },
            comment: {
                type: String,
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model("Product", productSchame)