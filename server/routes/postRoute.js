const express = require("express");
const { createPost, getMyPosts, getAllPosts, updatePost, deletePost } = require("../Controllers/postController");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

//protected means you cannot create a task if you are not logged in
router.post("/", protect, createPost);
router.get("/me", protect, getMyPosts);
router.get("/all", protect, authorize(["admin"]), getAllPosts);
router.put("/:id", protect,authorize(["admin"]),updatePost);
router.delete("/:id", protect,authorize(["admin"]), deletePost);

module.exports = router;