const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');

router.route("/")
    .post(nhanvien.create);




module.exports = router;
