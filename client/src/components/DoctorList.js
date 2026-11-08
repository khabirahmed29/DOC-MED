import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <article className="doctor-card">
      <div className="doctor-card-header">
        Dr. {doctor.firstName} {doctor.lastName}
      </div>
      <div className="doctor-card-content">
        <p>
          <b>Specialization</b> {doctor.specialization}
        </p>
        <p>
          <b>Experience</b> {doctor.experience}
        </p>
        <p>
          <b>Fees Per Consultation</b> {doctor.feesPerCunsaltation}
        </p>
        <p>
          <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
        </p>
        <Button
          type="button"
          className="app-action-button"
          onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
        >
          Book an appointment <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
};

export default DoctorList;
