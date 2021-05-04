const express = require("express");
const router = express.Router();

const {
  getProductbyID,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories,
  photo,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");

// params
router.param("userId", getUserByID);
router.param("productId", getProductbyID);

// all actual routes
router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
    );

router.get("/product/:productId", getProduct);
router.get("product/photo/:productId", photo);

//delete route
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

// update route
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

// listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;



