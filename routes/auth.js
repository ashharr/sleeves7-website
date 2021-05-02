var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');
const { isLength } = require("lodash");
var { signin, signup, signout, isSignedIn } = require("../controllers/auth");

router.post("/signup", [
    check("name", "name should be atleast 3 characters.").isLength({min: 3}),
    check("email","incorrect email").isEmail(),
    check("password", "password should be atleast 8 characters").isLength({min:8})
], signup);

router.post("/signin",[
    check("email", "incorrect email").isEmail(),
    check("password", "password should be atleast characters").isLength({min: 8})
], signin);

router.get("/signout", signout);

module.exports = router;