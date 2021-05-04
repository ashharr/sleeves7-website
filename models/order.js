const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String, // will fetch from product model
  count: {
    type: Number,
    max: 10,
    default: 0,
  },
  price: Number, // will fetch from product model
});
const ProductCart = new mongoose.model("ProductCart", productCartSchema);

const orderSchema = new mongoose.Schema(
  {
    products: [productCartSchema],
    transactionId: {},
    amount: {
      type: Number,
    },
    address: String,
    status: {
      type: String,
      default: "Received",
      enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"],
    },
    updated: Date,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const Order = new mongoose.model("Order", orderSchema);

module.exports = {
  Order,
  ProductCart,
};
