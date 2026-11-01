import React, { useState } from "react";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import {
  Bell,
  CalendarDays,
  House,
  LogOut,
  Menu,
  Stethoscope,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import "../styles/navbar.css";

const menuIcons = {
  Home: House,
  Appointments: CalendarDays,
  "Apply Doctor": Stethoscope,
  Doctors: Stethoscope,
  Users,
  Profile: UserRound,
};

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const doctorMenu = [
    { name: "Appointments", path: "/doctor-appointments" },
    { name: "Profile", path: `/doctor/profile/${user?._id}` },
  ];
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;
  const notificationCount = user?.notifcation?.length || 0;

  const closeMenu = () => setMenuOpen(false);
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="site-nav-inner">
        <Link to="/" className="site-brand" onClick={closeMenu}>
          <span className="site-brand-icon"><Stethoscope aria-hidden="true" /></span>
          <span>DOCMED</span>
        </Link>

        <nav className={`site-nav-links${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {sidebarMenu.map((item) => {
            const Icon = menuIcons[item.name] || House;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMenu}
                className={`site-nav-link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={17} aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          <div className="site-nav-mobile-actions">
            <Link to="/notification" className="site-nav-link" onClick={closeMenu}>
              <Bell size={17} aria-hidden="true" />
              <span>Notifications{notificationCount > 0 ? ` (${notificationCount})` : ""}</span>
            </Link>
            <Link to={user?.isDoctor ? `/doctor/profile/${user._id}` : "/profile"} className="site-nav-link" onClick={closeMenu}>
              <UserRound size={17} aria-hidden="true" />
              <span>{user?.name || "Profile"}</span>
            </Link>
            <button type="button" className="site-nav-link site-logout-link" onClick={handleLogout}>
              <LogOut size={17} aria-hidden="true" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        <div className="site-nav-actions">
          <Button
            variant="ghost"
            size="sm"
            className="site-icon-button site-notification-button"
            aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
            onClick={() => navigate("/notification")}
          >
            <Bell size={19} aria-hidden="true" />
            {notificationCount > 0 && <span className="site-notification-count">{notificationCount}</span>}
          </Button>
          <Link to={user?.isDoctor ? `/doctor/profile/${user._id}` : "/profile"} className="site-account-link">
            <UserRound size={17} aria-hidden="true" />
            <span>{user?.name || "Profile"}</span>
          </Link>
          <Button variant="outline" size="sm" className="site-logout-button" onClick={handleLogout}>
            <LogOut size={16} aria-hidden="true" />
            <span>Logout</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="site-icon-button site-menu-button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Layout;
