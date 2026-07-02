const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, categoryController.createCategory);

router.get("/", verifyToken, categoryController.getAllCategory);

router.get("/:id", verifyToken, categoryController.getCategoryById);

router.put("/:id", verifyToken, categoryController.updateCategory);

router.delete("/:id", verifyToken, categoryController.deleteCategory);

module.exports = router;