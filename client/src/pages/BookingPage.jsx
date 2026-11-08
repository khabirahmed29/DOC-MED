import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { CalendarDays, Clock3, Wallet } from "lucide-react";
import { Button } from "../components/ui/button";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(res.data.available);
        if (res.data.available) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message);
        }
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.response?.data?.message || "Unable to book this appointment.");
    }
  };

  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Layout />

      <main className="app-page">
        <h1 className="app-page-heading">Book an appointment</h1>
        <p className="app-page-description">Choose a date and time that works for you.</p>
        {doctors?._id && (
          <section className="app-panel booking-panel">
            <div className="booking-doctor-summary">
              <span className="booking-doctor-icon"><CalendarDays size={22} aria-hidden="true" /></span>
              <div>
                <p className="booking-overline">Appointment with</p>
                <h2>Dr. {doctors.firstName} {doctors.lastName}</h2>
                <p>{doctors.specialization || "Medical specialist"}</p>
              </div>
            </div>
            <div className="booking-facts">
              <div><Wallet size={17} aria-hidden="true" /><span>Consultation fee</span><strong>{doctors.feesPerCunsaltation}</strong></div>
              <div><Clock3 size={17} aria-hidden="true" /><span>Available hours</span><strong>{doctors.timings?.[0]} – {doctors.timings?.[1]}</strong></div>
            </div>
            <div className="booking-form">
              <label htmlFor="booking-date">Date</label>
              <DatePicker
                id="booking-date"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <label htmlFor="booking-time">Time</label>
              <TimePicker
                id="booking-time"
                format="HH:mm"
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <Button
                type="button"
                className="app-action-button"
                onClick={handleAvailability}
              >
                Check Availability
              </Button>
              {isAvailable && (
                <Button type="button" className="app-action-button" onClick={handleBooking}>
                  Confirm appointment
                </Button>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default BookingPage;
