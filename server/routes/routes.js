var express = require("express");
var router = express.Router();

var employeeController = require("../routes/controller/employeeController")

router.get('/users', employeeController.getUser);

module.exports = router;