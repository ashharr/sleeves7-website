const express = require("express");
const router = express.Router();

const { getUserByID, getUser , updateUser, userPurchaseList} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userID", getUserByID);

router.get("/user/:userID", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userID", isSignedIn, isAuthenticated, updateUser);
router.get("/orders/user/:userID", isSignedIn, isAuthenticated, userPurchaseList);

// router.get("/allusers", getAllUsers);

module.exports = router;
