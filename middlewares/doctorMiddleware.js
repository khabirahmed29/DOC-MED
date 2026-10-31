const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

module.exports = async (req, res, next) => {
  try {
    const [user, doctor] = await Promise.all([
      userModel.findById(req.body.userId).select("isDoctor"),
      doctorModel.findOne({ userId: req.body.userId, status: "approved" }),
    ]);

    if (!user || !user.isDoctor || !doctor) {
      return res.status(403).send({ success: false, message: "Approved doctor access required." });
    }

    req.doctor = doctor;
    return next();
  } catch (error) {
    return res.status(500).send({ success: false, message: "Unable to verify doctor access." });
  }
};
