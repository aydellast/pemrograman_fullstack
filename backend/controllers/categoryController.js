const Category = require("../models/categoryModel");;

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({
      user_id: req.user.id,
      name,
    });

    res.status(201).json({
      message: "Kategori berhasil ditambahkan",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { user_id: req.user.id },
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    await Category.update(
      { name },
      { where: { id, user_id: req.user.id } }
    );

    res.json({ message: "Kategori berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.destroy({
      where: { id, user_id: req.user.id },
    });

    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};