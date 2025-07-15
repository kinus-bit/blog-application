const Category = require("../models/Category");

// POST /api/Category
exports.createCategory = async (req, res)=> {
    //spread operator copying to the frontend and then saying the owner
    const category = await  Category.create({ ...req.body, owner: req.user.id});
    res.json(category);
};

// GET /api/categories/me
exports.getMyCategories = async (req, res) => {
    const categories = await Category.find({ owner: req.user.id });
    res.json(categories);
};

// GET /api/categories/all
exports.getAllCategories = async (req, res) => {
    //returns who created a category without the user full data
    const categories = await Category.find().populate("owner", "username email");
    res.json(categories);
};

// PUT /api/categories/:id
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Check if user owns the category or is admin
        if (category.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update this category" });
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/category/:id
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Check if user owns the category or is admin
        if (category.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this category" });
        }

        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};