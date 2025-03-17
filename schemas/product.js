let mongoose = require('mongoose');
let Category = require('./category'); // Import model Category

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, "truong nay la unique"]
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    quantity: {
        type: Number,
        default: 0,
        min: 0
    },
    description: {
        type: String,
        default: ""
    },
    imgURL: {
        type: String,
        default: ""
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Tham chiếu đến model Category
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);