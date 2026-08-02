const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { logIn, insertLogs, register, getProfile} = require('../controller/logController');

//LoginAPI
router.post("/login",logIn );

//RegisterAPI
router.post("/register",register)

// User Profile 
router.get("/getProfile", authMiddleware,getProfile );


//insert api
router.get("/insert", authMiddleware, insertLogs );

module.exports = router;


