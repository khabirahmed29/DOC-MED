import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
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

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        const orderedDoctors = [...res.data.data].sort((first, second) => {
          const firstIsPending = first.status === "pending";
          const secondIsPending = second.status === "pending";
          if (firstIsPending !== secondIsPending) return firstIsPending ? -1 : 1;
          return new Date(second.createdAt || 0) - new Date(first.createdAt || 0);
        });
        setDoctors(orderedDoctors);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <>
      <Layout />
      <main className="app-page">
        <p className="home-section-kicker" style={{ textAlign: "left" }}>Administration</p>
        <h1 className="app-page-heading">Doctors</h1>
        <p className="app-page-description">Review doctor applications and account status.</p>
        <Table containerClassName="admin-doctors-table-container">
          <colgroup>
            <col className="admin-doctors-name-column" />
            <col className="admin-doctors-status-column" />
            <col className="admin-doctors-phone-column" />
            <col className="admin-doctors-actions-column" />
          </colgroup>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.length ? doctors.map((doctor) => (
              <TableRow key={doctor._id}>
                <TableCell>{doctor.firstName} {doctor.lastName}</TableCell>
                <TableCell>
                  <span className={`doctor-status-pill status-${doctor.status}`}>{doctor.status}</span>
                </TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>
                  <div className="admin-doctor-actions">
                    {doctor.status === "pending" ? (
                      <>
                        <Button type="button" className="app-action-button" onClick={() => handleAccountStatus(doctor, "approved")}>
                          Approve
                        </Button>
                        <Button type="button" variant="outline" className="app-action-button app-action-button-danger" onClick={() => handleAccountStatus(doctor, "rejected")}>
                          Reject
                        </Button>
                      </>
                    ) : doctor.status === "approved" ? (
                      <Button type="button" variant="outline" className="app-action-button app-action-button-danger" onClick={() => handleAccountStatus(doctor, "removed")}>
                        Remove
                      </Button>
                    ) : (
                      <span className="admin-doctor-status-note">{doctor.status}</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="app-empty-state">No doctor applications found.</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </>
  );
};

export default Doctors;
