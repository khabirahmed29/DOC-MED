import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="card m-2 box">
        <div className="card-header card-top">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className=" content">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Cunsaltation</b> {doctor.feesPerCunsaltation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
          <button
            className="btn "
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
