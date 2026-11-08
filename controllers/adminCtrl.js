const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}).select("-password");
    res.status(200).send({
      success: true,
      message: "users data list",
      data: users,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "erorr while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctors Data list",
      data: doctors,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "error while getting doctors data",
      error,
    });
  }
};

// doctor account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const allowedStatuses = ["approved", "rejected", "removed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).send({ success: false, message: "Invalid doctor account status." });
    }
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor not found." });
    }
    const user = await userModel.findOne({ _id: doctor.userId });
    if (!user) {
      return res.status(404).send({ success: false, message: "Doctor account user not found." });
    }
    doctor.status = status;
    await doctor.save();
    const notifcation = user.notifcation || [];
    const notificationMessage = status === "removed"
      ? "Your doctor account has been removed."
      : `Your doctor account request has been ${status}.`;
    notifcation.push({
      type: "doctor-account-request-updated",
      message: notificationMessage,
      onClickPath: "/notification",
    });
    user.notifcation = notifcation;
    user.isDoctor = status === "approved";
    await user.save();
    res.status(201).send({
      success: true,
      message: "Account Status Updated",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in Account Status",
      error,
    });
  }
};

module.exports = {
  getAllDoctorsController,
  getAllUsersController,
  changeAccountStatusController,
};
