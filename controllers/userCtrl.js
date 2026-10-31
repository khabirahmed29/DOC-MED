const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
const mongoose = require("mongoose");

//register callback
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    const normalizedName = typeof name === "string" ? name.trim() : "";
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedName || normalizedName.length > 80) {
      return res.status(400).send({ success: false, message: "Enter a name up to 80 characters long." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).send({ success: false, message: "Enter a valid email address." });
    }
    if (typeof password !== "string" || password.length < 8 || password.length > 128) {
      return res.status(400).send({ success: false, message: "Password must be between 8 and 128 characters." });
    }

    const existingUser = await userModel.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).send({ success: false, message: "An account with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send({ message: "Registered successfully.", success: true });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({ success: false, message: "An account with this email already exists." });
    }
    res.status(500).send({
      success: false,
      message: "Unable to register right now.",
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid email or password.", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid email or password.", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    // console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    if (!user) {
      return res.status(404).send({
        message: "user not found",
        success: false,
      });
    } else {
      user.password = undefined;
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const adminUser = await userModel.findOne({ isAdmin: true });
    if (!adminUser) {
      return res.status(404).send({ success: false, message: "Admin account not found." });
    }
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const notifcation = adminUser.notifcation;
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found." });
    }
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    const safeUser = updatedUser.toObject();
    delete safeUser.password;
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: safeUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

// delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found." });
    }
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

//GET ALL DOC
const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Docots Lists Fetched Successfully",
      data: doctors,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Fetching DOctor",
    });
  }
};

//BOOK APPOINTMENT
const bookeAppointmnetController = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const dateTime = moment(
      `${req.body.date || ""} ${req.body.time || ""}`,
      "DD-MM-YYYY HH:mm",
      true
    );

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).send({ success: false, message: "Invalid doctor." });
    }
    if (!dateTime.isValid() || dateTime.isBefore(moment())) {
      return res.status(400).send({ success: false, message: "Choose a valid future date and time." });
    }

    const doctor = await doctorModel.findOne({ _id: doctorId, status: "approved" });
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Approved doctor not found." });
    }
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found." });
    }

    const appointmentDate = dateTime.clone().startOf("day").toISOString();
    const appointmentTime = dateTime.toISOString();
    const conflictingAppointments = await appointmentModel.find({
      doctorId: doctor._id.toString(),
      date: appointmentDate,
      status: { $ne: "reject" },
      time: {
        $gte: dateTime.clone().subtract(1, "hour").toISOString(),
        $lte: dateTime.clone().add(1, "hour").toISOString(),
      },
    });
    if (conflictingAppointments.length > 0) {
      return res.status(409).send({ success: false, message: "This appointment time is no longer available." });
    }

    const newAppointment = new appointmentModel({
      userId: user._id.toString(),
      doctorId: doctor._id.toString(),
      doctorInfo: doctor.toObject(),
      userInfo: { _id: user._id, name: user.name, email: user.email },
      date: appointmentDate,
      time: appointmentTime,
      status: "pending",
    });
    await newAppointment.save();
    user.notifcation.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${user.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const dateTime = moment(
      `${req.body.date || ""} ${req.body.time || ""}`,
      "DD-MM-YYYY HH:mm",
      true
    );
    if (
      !mongoose.Types.ObjectId.isValid(doctorId) ||
      !dateTime.isValid() ||
      dateTime.isBefore(moment())
    ) {
      return res.status(400).send({ success: false, message: "Choose a valid doctor, date, and time." });
    }
    const doctor = await doctorModel.findOne({ _id: doctorId, status: "approved" });
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Approved doctor not found." });
    }
    const appointments = await appointmentModel.find({
      doctorId: doctor._id.toString(),
      date: dateTime.clone().startOf("day").toISOString(),
      status: { $ne: "reject" },
      time: {
        $gte: dateTime.clone().subtract(1, "hour").toISOString(),
        $lte: dateTime.clone().add(1, "hour").toISOString(),
      },
    });
    const available = appointments.length === 0;
    return res.status(200).send({
      success: true,
      available,
      message: available ? "Appointments available" : "Appointments not available at this time",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "User not found." });
    }
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDoctorsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
};
