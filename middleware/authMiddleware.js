const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
   const authHeader= req.headers.authorization;
   if (!authHeader) {
    return res.status(401).json({
        success: false,
        message: "Authorization header is missing"
    });
 }

     if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
        success: false,
        message: "Invalid Authorization header"
    });
}

  const token = authHeader.split(" ")[1];

    
    try {
         const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch (err) {
        console.error(err);
    
    return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
    });
        
    }

};

module.exports = authMiddleware;