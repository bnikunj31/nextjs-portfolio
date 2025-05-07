const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthenticated = async (req, res, next) => {
  // Check if token is received or not
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;
  if (!token) {
    return res.status(401).json({
      error: "Authorization token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const { user } = decoded;
    if (!user) {
      return res.status(401).json({ error: "Un-Aurthorized Access." });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ error: "Access Denied." });
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Internal Server Error.` });
  }
};
