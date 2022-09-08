const jwt = require("jsonwebtoken");
const JWT_SECRET = "There we are again";

const verifyToken = (req, res, next) => {
    if (req.body) {
        const token = req.body.token;
    } else if (req.query) {
        req.query.token
    }
    const token = req.headers["auth-token"];

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;