const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        maxlength: 64,
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: String,
        trim: true,
        maxlength: 32,
        required: true
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    stock: {
        type: Number
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
}, {
    timestamps: true
})