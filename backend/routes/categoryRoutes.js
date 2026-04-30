const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE
router.post("/", authMiddleware, categoryController.createCategory);

// READ
router.get("/", authMiddleware, categoryController.getCategories);

// UPDATE
router.put("/:id", authMiddleware, categoryController.updateCategory);

// DELETE
router.delete("/:id", authMiddleware, categoryController.deleteCategory);

module.exports = router;