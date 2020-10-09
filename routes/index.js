const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
router.get("/register", function (req, res, next) {
    res.render("pages/register");
});
router.get("/memberList", function (req, res, next) {
    res.render("pages/memberList");
});

module.exports = router;
