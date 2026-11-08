import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
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
  ];

  return (
    <main className="app-page">
      <p className="home-section-kicker" style={{ textAlign: "left" }}>Your care</p>
      <h1 className="app-page-heading">My appointments</h1>
      <p className="app-page-description">Review the date, time, and status of your appointments.</p>
      {appointments.length ? (
        <Table rowKey="_id" columns={columns} dataSource={appointments} />
      ) : (
        <div className="app-empty-state">You don’t have any appointments yet.</div>
      )}
    </main>
  );
};

export default DoctorAppointments;
