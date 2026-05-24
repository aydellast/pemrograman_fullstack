const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/categoryController');


// CREATE
router.post('/', categoryController.createCategory);

// GET ALL
router.get('/', categoryController.getAllCategory);

// GET BY ID
router.get('/:id', categoryController.getCategoryById);

// UPDATE
router.put('/:id', categoryController.updateCategory);

// DELETE
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;