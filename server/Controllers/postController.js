const Post = require("../models/Post");

// POST /api/Post
exports.createPost = async (req, res)=> {
    //spread operator copying to the frontend and then saying the owner
    const post = await  Post.create({ ...req.body, owner: req.user.id});
    res.json(post);
};

// GET /api/posts/me
exports.getMyPosts = async (req, res) => {
    const posts = await Post.find({ owner: req.user.id });
    res.json(posts);
};

// GET /api/posts/all
exports.getAllPosts = async (req, res) => {
    //returns who created a post without the user full data
    const posts = await Post.find().populate("owner", "username email");
    res.json(posts);
};

// PUT /api/posts/:id
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user owns the post or is admin
        if (post.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update this post" });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if user owns the post or is admin
        if (post.owner.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to delete this post" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};