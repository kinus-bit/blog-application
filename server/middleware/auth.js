const jwt = require("jsonwebtoken");


// Checks token and sets req.user
//protect ensures only the login user can access the routes.
exports.protect = (req, res, next) => {
    const auth = req.headers.authorization;
    //extract authorisation header
    if(!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No Token Given"});

    //Bearer <token> -the first is index 1 and the second is index 2.
    const token = auth.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //attaching our user to the token. 
        req.user = decoded; // {id, role}
        next();
    } catch (error) {
        return res.status(403).json({ message: "invalid token"});
    }
};

// Checks role
exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden"});
        next();
    };
};
