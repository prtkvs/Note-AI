const express = require("express");
const { registerUser,loginUser,currentUser } = require("../../controllers/userController");
const router = express.Router();
const validateTokenHandler = require("../../middleware/validateTokenHandler");

// // protected route
// router.use(validateTokenHandler);

router.post("/register",registerUser); // /user/register
router.post("/login",loginUser);
router.get("/current",validateTokenHandler,currentUser);
// can make a router.patch for updating user details like password etc in future

module.exports = router;