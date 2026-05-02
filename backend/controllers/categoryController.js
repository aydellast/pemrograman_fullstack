let categories = [];

exports.createCategory = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Nama wajib" });
    }

    categories.push({ id: categories.length + 1, name });

    res.json({ message: "OK", data: categories });
};

exports.getCategories = (req, res) => {
    res.json(categories);
};

exports.updateCategory = (req, res) => {
    res.json({ message: "update" });
};

exports.deleteCategory = (req, res) => {
    res.json({ message: "delete" });
};