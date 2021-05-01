const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true, 
            trim: true,
            maxlength: 32,  
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Category", categorySchema);
