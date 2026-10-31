const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("authorization") || "";
  const tokenMatch = authHeader.match(/^Bearer\s+(\S+)$/i);

  if (!tokenMatch) {
    return res.status(401).send({ success: false, message: "Authentication required." });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).send({ success: false, message: "Authentication is not configured." });
  }

  try {
    const decoded = JWT.verify(tokenMatch[1], process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).send({ success: false, message: "Invalid or expired token." });
    }
    req.body = req.body || {};
    req.body.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).send({ success: false, message: "Invalid or expired token." });
  }
};
