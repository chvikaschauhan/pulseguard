const express = require("express");
const router = express.Router();

const { logIn, insertLogs, register} = require('../controller/logController');

//LoginAPI
router.post("/login", logIn );

//RegisterAPI
router.post("/register", register)


//insert api
router.get("/insert", insertLogs );

module.exports = router;


