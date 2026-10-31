

const appointmentModel = require("../models/appointmentModel");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModels");
const mongoose = require("mongoose");

const getDoctorInfoController =async (req, res) =>{
  try{
    const doctor = await doctorModel.findOne({userId: req.body.userId})
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor profile not found." });
    }
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  }catch(error){
    // console.log(error)
    res.status(500).send({
      success:false,
      error,
      message: 'error in Fetching Doctor Details'
    })
  }
};

// update doc profile
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor profile not found." });
    }
    res.status(201).send({
      success: true,
      message: "Doctor Profile Updated",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Doctor Profile Update issue",
      error,
    });
  }
};

//get single docotor
const getDoctorByIdController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor not found." });
    }
    res.status(200).send({
      success: true,
      message: "Sigle Doc Info Fetched",
      data: doctor,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single docot info",
    });
  }
};

// Doctor Appointment Controller
const doctorAppointmentsController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    if (!doctor) {
      return res.status(404).send({ success: false, message: "Doctor profile not found." });
    }
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor Appointments fetch Successfully",
      data: appointments,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Doc Appointments",
    });
  }
};

const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    if (!mongoose.Types.ObjectId.isValid(appointmentsId)) {
      return res.status(400).send({ success: false, message: "Invalid appointment." });
    }
    if (!["approved", "reject"].includes(status)) {
      return res.status(400).send({ success: false, message: "Status must be approved or reject." });
    }

    const doctor = await doctorModel.findOne({
      userId: req.body.userId,
      status: "approved",
    });
    if (!doctor) {
      return res.status(403).send({ success: false, message: "An approved doctor account is required." });
    }

    const appointment = await appointmentModel.findOne({
      _id: appointmentsId,
      doctorId: doctor._id.toString(),
    });
    if (!appointment) {
      return res.status(404).send({ success: false, message: "Appointment not found." });
    }

    const user = await userModel.findById(appointment.userId);
    if (!user) {
      return res.status(404).send({ success: false, message: "Appointment user not found." });
    }

    const updatedAppointment = await appointmentModel.findOneAndUpdate(
      { _id: appointmentsId, doctorId: doctor._id.toString() },
      { $set: { status } },
      { new: true, runValidators: true }
    );
    if (!updatedAppointment) {
      return res.status(404).send({ success: false, message: "Appointment not found." });
    }

    const notifcation = user.notifcation;
    notifcation.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onCLickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Update Status",
    });
  }
};


module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
};
