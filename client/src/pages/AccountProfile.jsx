import React from "react";
import { useSelector } from "react-redux";
import { ShieldCheck } from "lucide-react";
import Layout from "../components/Layout";

const avatarColors = [
  "#1685b4",
  "#7c3aed",
  "#15803d",
  "#b45309",
  "#be185d",
  "#0e7490",
  "#c2410c",
  "#4f46e5",
];

const getAvatarColor = (name = "") => {
  const hash = [...name.toLowerCase()].reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    0
  );
  return avatarColors[hash % avatarColors.length];
};

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";

const AccountProfile = () => {
  const { user } = useSelector((state) => state.user);
  const accountType = user?.isAdmin ? "Administrator" : user?.isDoctor ? "Doctor" : "Patient";

  return (
    <>
      <Layout />
      <main className="app-page">
        <p className="home-section-kicker" style={{ textAlign: "left" }}>Account</p>
        <h1 className="app-page-heading">My profile</h1>
        <p className="app-page-description">View your DOCMED account details.</p>
        <section className="app-panel profile-panel">
          <div className="profile-summary">
            <span
              className="profile-avatar"
              style={{ backgroundColor: getAvatarColor(user?.name || "user") }}
              aria-hidden="true"
            >
              {getInitials(user?.name || "")}
            </span>
            <div>
              <h2>{user?.name || "DOCMED member"}</h2>
              <p>{user?.email || "—"}</p>
            </div>
          </div>
          <div className="profile-detail-row">
            <span>Name</span><strong>{user?.name || "—"}</strong>
          </div>
          <div className="profile-detail-row">
            <span>Email</span><strong>{user?.email || "—"}</strong>
          </div>
          <div className="profile-detail-row">
            <span>Account type</span>
            <strong className="profile-role"><ShieldCheck size={15} aria-hidden="true" />{accountType}</strong>
          </div>
        </section>
      </main>
    </>
  );
};

export default AccountProfile;
