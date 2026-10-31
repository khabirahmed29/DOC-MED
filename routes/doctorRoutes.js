// const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

const express = require('express')
const authMiddleware =  require('../middlewares/authMiddleware')
const doctorMiddleware = require('../middlewares/doctorMiddleware')
const router = express.Router()

// Get Single Doc info 
router.post('/getDoctorInfo', authMiddleware, doctorMiddleware, getDoctorInfoController)

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, doctorMiddleware, updateProfileController);

// Post Get Single DOC Info
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

//GET Appointments
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorMiddleware,
  doctorAppointmentsController
);

//POST Update Status
router.post("/update-status", authMiddleware, doctorMiddleware, updateStatusController);

module.exports = router
