import React from "react";
import Layout from "./../../components/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");
  // Update doc
  //handle form
  const handleFinish = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { startTime, endTime, ...values } = Object.fromEntries(formData.entries());
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [startTime, endTime],
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
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  // Update doc

  //getDOc Details
  const getDoctorInfo = async () => {
    setIsLoadingProfile(true);
    setProfileError("");
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        setProfileError(res.data.message || "Could not load your doctor profile.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Could not load your doctor profile.";
      setProfileError(errorMessage);
      message.error(errorMessage);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <Layout />

      <main className="app-page">
      <p className="home-section-kicker" style={{ textAlign: "left" }}>Doctor workspace</p>
      <h1 className="app-page-heading">Manage profile</h1>
      <p className="app-page-description">Keep your professional details and availability up to date.</p>
      {isLoadingProfile && <p className="m-3">Loading doctor profile…</p>}
      {!isLoadingProfile && profileError && (
        <div className="app-panel profile-error" role="alert">
          <p>{profileError}</p>
          <Button className="app-action-button" type="button" onClick={getDoctorInfo}>
            Try again
          </Button>
        </div>
      )}
      {doctor && (
        <form onSubmit={handleFinish} className="app-panel app-form doctor-profile-form">
          <h2 className="app-subheading">Personal details</h2>
          <div className="doctor-profile-form-grid">
            <div className="doctor-profile-field">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="Your first name" defaultValue={doctor.firstName} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Your last name" defaultValue={doctor.lastName} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="phone">Phone No</Label>
              <Input id="phone" name="phone" placeholder="Your contact number" defaultValue={doctor.phone} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="Your email address" defaultValue={doctor.email} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="website">Website</Label>
              <Input id="website" name="website" placeholder="Your website" defaultValue={doctor.website} />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="Your clinic address" defaultValue={doctor.address} required />
            </div>
          </div>
          <h2 className="app-subheading">Professional details</h2>
          <div className="doctor-profile-form-grid">
            <div className="doctor-profile-field">
              <Label htmlFor="specialization">Specialization</Label>
              <Input id="specialization" name="specialization" placeholder="Your specialization" defaultValue={doctor.specialization} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="experience">Experience</Label>
              <Input id="experience" name="experience" placeholder="Years of experience" defaultValue={doctor.experience} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="feesPerCunsaltation">Fees Per Consultation</Label>
              <Input id="feesPerCunsaltation" name="feesPerCunsaltation" placeholder="Consultation fee" defaultValue={doctor.feesPerCunsaltation} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="startTime">Available from</Label>
              <Input id="startTime" name="startTime" type="time" defaultValue={doctor.timings?.[0] || ""} required />
            </div>
            <div className="doctor-profile-field">
              <Label htmlFor="endTime">Available until</Label>
              <Input id="endTime" name="endTime" type="time" defaultValue={doctor.timings?.[1] || ""} required />
            </div>
          </div>
          <div className="doctor-profile-submit">
            <Button className="app-action-button" type="submit">Update</Button>
          </div>
        </form>
      )}
      </main>
    </>
  );
};

export default Profile;
