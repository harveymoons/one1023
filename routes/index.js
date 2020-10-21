const router = require("express").Router();
const multer = require("multer");

// Test set multer every url
// router.use("/", multer().any());

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
router.get("/member/register", function (req, res, next) {
    res.render("pages/member/register");
});
router.get("/member/list", function (req, res, next) {
    res.render("pages/member/list");
});
router.get("/member/view", function (req, res, next) {
    res.render("pages/member/view");
});

/* Controller Router */
router.use("/file", require("./fileRoute"));
router.use("/member", require("./memberRoute"));

module.exports = router;
