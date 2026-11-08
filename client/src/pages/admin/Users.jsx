import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table } from "antd";
import { Button } from "../../components/ui/button";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <Button type="button" className="app-action-button app-action-button-danger">Block</Button>
      ),
    },
  ];

  return (
    <>
      <Layout />
      <main className="app-page">
        <p className="home-section-kicker" style={{ textAlign: "left" }}>Administration</p>
        <h1 className="app-page-heading">Users</h1>
        <p className="app-page-description">View and manage DOCMED user accounts.</p>
        <Table rowKey="_id" columns={columns} dataSource={users} />
      </main>
    </>
  );
};

export default Users;
