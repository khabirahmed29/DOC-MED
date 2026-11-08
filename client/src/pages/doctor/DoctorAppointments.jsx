import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";

import axios from "axios";

import moment from "moment";
import { message, Table } from "antd";
import { Button } from "../../components/ui/button";

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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <Button
                type="button"
                className="app-action-button"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </Button>
              <Button
                type="button"
                variant="outline"
                className="app-action-button app-action-button-danger"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <>
      <Layout />
      <main className="app-page">
        <p className="home-section-kicker" style={{ textAlign: "left" }}>Doctor workspace</p>
        <h1 className="app-page-heading">Appointments</h1>
        <p className="app-page-description">Review and update appointment requests.</p>
        <Table rowKey="_id" columns={columns} dataSource={appointments} />
      </main>
    </>
  );
};

export default DoctorAppointments;
