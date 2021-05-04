const express = require("express");
const router = express.Router();

const {
  getCategoryByID,
  createCategory,
  getCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
} = require("../controllers/category");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserByID } = require("../controllers/user");

router.param("userID", getUserByID);
router.param("categoryId", getCategoryByID);

//create route
router.post(
  "/category/create/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

//read route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

//update route
router.put(
  "/category/:categoryId/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

//delete route
router.delete(
  "/category/:categoryId/:userID",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
