const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const regimeController = require("../controllers/RegimeController");

router.get("/regims", regimeController.getAllRegime);
// router.get("/days", regimeController.getAllDays);
router.get("/oneregim", regimeController.getOneRegime);
router.get("/oneregimwithday", regimeController.getOneRegimeWithDay);

router.post(
  "/changeregim",
  roleMiddleware(["admin"]),
  regimeController.editRegime
);

module.exports = router;
