const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


// Signup Endpoint Logic instead of exporting them down there. 
exports.signup = async (req, res) => {
    try {
        const { username, email, password} = req.body;

        // Check if user already exists by email or username
        const emailExists = await User.findOne({ email });
        if (emailExists) return res.status(400).json({ message: "Email already exists" });

        const usernameExists = await User.findOne({ username });
        if (usernameExists) return res.status(400).json({ message: "Username already exists" });

        const hashed = await bcrypt.hash(password, 10);
        //saving to the database
        const user = await User.create({ username, email, password: hashed});

        const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// Login Endpoint Logic
//export is a shortcut rather than exporting at the bottom.
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User Not Found"});

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ message: "incorrect password"});

        const token = jwt.sign({ id: user._id, role: user.role, username: user.username}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};