const Category = require('../models/categoryModel');


// CREATE CATEGORY
exports.createCategory = (req, res) => {

    const { user_id, name } = req.body;

    if (!user_id || !name) {
        return res.status(400).json({
            message: "user_id dan name wajib diisi"
        });
    }

    Category.create(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        }

        res.status(201).json({
            message: "Category berhasil dibuat",
            data: result
        });

    });

};


// GET ALL CATEGORY
exports.getAllCategory = (req, res) => {

    Category.getAll((err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        }

        res.status(200).json(result);

    });

};


// GET CATEGORY BY ID
exports.getCategoryById = (req, res) => {

    const { id } = req.params;

    Category.getById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Category tidak ditemukan"
            });
        }

        res.status(200).json(result[0]);

    });

};


// UPDATE CATEGORY
exports.updateCategory = (req, res) => {

    const { id } = req.params;

    Category.update(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        }

        res.status(200).json({
            message: "Category berhasil diupdate"
        });

    });

};


// DELETE CATEGORY
exports.deleteCategory = (req, res) => {

    const { id } = req.params;

    Category.delete(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Server error",
                error: err
            });
        }

        res.status(200).json({
            message: "Category berhasil dihapus"
        });

    });

};