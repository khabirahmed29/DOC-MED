import React from "react";
import { Card, Descriptions, Tag } from "antd";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

const AccountProfile = () => {
  const { user } = useSelector((state) => state.user);
  const accountType = user?.isAdmin ? "Administrator" : "Patient";

  return (
    <>
      <Layout />
      <main className="container my-5">
        <h1>My Profile</h1>
        <p>View your DOCMED account details.</p>
        <Card className="mt-4">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Name">{user?.name || "—"}</Descriptions.Item>
            <Descriptions.Item label="Email">{user?.email || "—"}</Descriptions.Item>
            <Descriptions.Item label="Account type">
              <Tag color={user?.isAdmin ? "blue" : "green"}>{accountType}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </main>
    </>
  );
};

export default AccountProfile;
