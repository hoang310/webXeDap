// routes/userRoutes.js
const { authMiddleware } = require("../middleware/authMiddleware");

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;