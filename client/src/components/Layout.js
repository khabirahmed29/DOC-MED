import React from "react";
import { adminMenu, userMenu } from "./../Data/data";
import "../index.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";
import { useState } from "react";

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // logout funtion
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  const [toggle, setToogle] = useState(false);

  // Doctor Menu
  const doctorMenu = [
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  // Doctor Menu

  // redering menu list
  // eslint-disable-next-line
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <header>
      <Link to="/" className="logo">
        <a class="logo">
          <i class="fa-solid fa-user-doctor"></i> DOCMED
        </a>
      </Link>
      <nav className={`${toggle ? "active" : "navbar "}`}>
        {SidebarMenu.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <>
              <div className={`menu-item ${isActive && "active"}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            </>
          );
        })}

        <Badge
          count={user && user.notifcation.length}
          onClick={() => {
            navigate("/notification");
          }}
        >
          <i class="fa-solid fa-bell"></i>
        </Badge>

        <Link to="/doctor/profile/${user?._id}">{user?.name}</Link>
        <div className="" onClick={handleLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <Link to="/login">Logout</Link>
        </div>
      </nav>
      <div class="icons">
        <i
          class={`fas ${toggle ? "fa-times" : "fa-bars"}`}
          id="menu-bars"
          onClick={() => setToogle(!toggle)}
        ></i>
      </div>
      <br />
    </header>
  );
};

export default Layout;
