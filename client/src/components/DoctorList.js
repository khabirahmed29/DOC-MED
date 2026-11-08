import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <Card className="doctor-card">
      <CardHeader className="doctor-card-header">
        <CardTitle>
          Dr. {doctor.firstName} {doctor.lastName}
        </CardTitle>
      </CardHeader>
      <CardContent className="doctor-card-content">
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
      </CardContent>
    </Card>
  );
};

export default DoctorList;
