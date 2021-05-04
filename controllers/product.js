const Product = require("../models/product");
const formidable = require("formidable"); // to create form data which has non-textual fields
const _ = require("lodash");
const fs = require("fs");
const { sortBy } = require("lodash");

exports.getProductbyID = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, prod) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found in DB.",
        });
      }
      req.product = prod;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Image not compatible.",
      });
    }
    const { name, description, price, stock, category } = fields;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        error: "Please include all the fields",
      });
    }

    let product = new Product(fields);

    //file handling
    if (file.photo) {
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "File size too big! Max: 3 MB.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      //save to the DB
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Failed saving product to DB.",
          });
        }
        res.json(product);
      });
    }
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

//delete controller
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: `${product.name} Product Delete Failed`,
      });
    }
    res.json({
      message: `${deletedProduct} Successfully Deleted`,
    });
  });
};

//update controller
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Image not compatible.",
      });
    }
    const { name, description, price, stock, category } = fields;

    let product = new Product(fields);
    product = _.extend(product, fields);
    //file handling
    if (file.photo) {
      if (file.photo.size > 3145728) {
        return res.status(400).json({
          error: "File size too big! Max: 3 MB.",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;

      //save to the DB
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Failed updating product to DB.",
          });
        }
        res.json(product);
      });
    }
  });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "NO category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed",
      });
    }
    next();
  });
};
