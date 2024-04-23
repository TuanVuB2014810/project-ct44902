const  express = require("express");
const theodoimuonsach= require("../controllers/theodoimuonsach.controller");

const router = express.Router();

router.route("/")
    .get(theodoimuonsach.findAll)
    .post(theodoimuonsach.create)

router.route("/:id")
    .get(theodoimuonsach.findOne)
    .put(theodoimuonsach.update)

    
router.route("/duyet/:id")
    .get(theodoimuonsach.duyet)

router.route("/traSach/:id")
    .get(theodoimuonsach.tra)
module.exports = router;
