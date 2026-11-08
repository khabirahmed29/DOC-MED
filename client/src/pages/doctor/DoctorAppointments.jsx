import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";

import moment from "moment";
import { message } from "antd";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/doctor//doctor-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/update-status",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      // console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <>
      <Layout />
      <main className="app-page">
        <p className="home-section-kicker" style={{ textAlign: "left" }}>Doctor workspace</p>
        <h1 className="app-page-heading">Appointments</h1>
        <p className="app-page-description">Review and update appointment requests.</p>
        <Table containerClassName="doctor-appointments-table-container">
          <TableHeader>
            <TableRow>
              <TableHead>Appointment ID</TableHead>
              <TableHead>Date &amp; Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length ? appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell className="appointment-id-cell">{appointment._id}</TableCell>
                <TableCell>
                  {moment(appointment.date).format("DD-MM-YYYY")} at {moment(appointment.time).format("HH:mm")}
                </TableCell>
                <TableCell>
                  <span className={`doctor-status-pill status-${appointment.status}`}>
                    {appointment.status}
                  </span>
                </TableCell>
                <TableCell>
                  {appointment.status === "pending" && (
                    <div className="appointment-actions">
                      <Button
                        type="button"
                        className="app-action-button"
                        onClick={() => handleStatus(appointment, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="app-action-button app-action-button-danger"
                        onClick={() => handleStatus(appointment, "reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="app-empty-state">No appointments found.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </>
  );
};

export default DoctorAppointments;
