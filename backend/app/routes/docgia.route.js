const  express = require("express");
const docgia= require("../controllers/docgia.controller");

const router = express.Router();

router.route("/")
    .post(docgia.create)
    .get(docgia.findAll)
router.route("/:id")
    .get(docgia.findOne)
    .put(docgia.update)
    .delete(docgia.delete); 

module.exports = router;