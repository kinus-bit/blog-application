const express = require("express");
const { createCategory, getMyCategories, getAllCategories, updateCategory, deleteCategory } = require("../controllers/categoryController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

//protected means you cannot create a task if you are not logged in
router.post("/", protect, createCategory);
router.get("/me", protect, getMyCategories);
router.get("/all", protect, authorize(["admin"]), getAllCategories);
router.put("/:id", protect,authorize(["admin"]),updateCategory);
router.delete("/:id", protect,authorize(["admin"]), deleteCategory);

module.exports = router;