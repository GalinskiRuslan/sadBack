const Router = require("express");
const router = new Router();

const authController = require("../controllers/AuthController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/login", authController.login);
router.post("/registration", authController.registration);
router.get("/checkIsAuth", authMiddleware, authController.checkIsAuth);

module.exports = router;
