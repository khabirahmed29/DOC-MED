const userModel = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId).select("isAdmin");
    if (!user || !user.isAdmin) {
      return res.status(403).send({ success: false, message: "Admin access required." });
    }
    return next();
  } catch (error) {
    return res.status(500).send({ success: false, message: "Unable to verify admin access." });
  }
};
