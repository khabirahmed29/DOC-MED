import React, { useEffect, useRef, useState } from "react";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  Bell,
  CalendarDays,
  ChevronDown,
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

const Layout = () => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const doctorMenu = [
    { name: "Appointments", path: "/doctor-appointments" },
    { name: "Profile", path: `/doctor/profile/${user?._id}` },
  ];
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
      ? doctorMenu
      : userMenu;
  const navigationMenu = sidebarMenu.filter((item) => item.name !== "Profile");
  const notificationCount = user?.notifcation?.length || 0;
  const accountPath = user?.isDoctor
    ? `/doctor/profile/${user._id}`
    : "/profile";
  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const closeMenu = () => setMenuOpen(false);
  const closeAccountMenu = () => setAccountOpen(false);
  const handleLogout = () => {
    closeAccountMenu();
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  useEffect(() => {
    if (!accountOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      if (!accountMenuRef.current?.contains(event.target))
        setAccountOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setAccountOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [accountOpen]);

  return (
    <header className="site-header">
      <div className="site-nav-inner">
        <Link to="/" className="site-brand" onClick={closeMenu}>
          <span className="site-brand-icon">
            <Stethoscope aria-hidden="true" />
          </span>
          <span>DOCMED</span>
        </Link>

        <nav
          className={`site-nav-links${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          {navigationMenu.map((item) => {
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

          <Link
            to="/notification"
            className="site-nav-link site-mobile-notifications"
            onClick={closeMenu}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Bell size={17} aria-hidden="true" />
              </TooltipTrigger>
              <TooltipContent side="top" className="site-notification-tooltip">
                {notificationCount > 0
                  ? `${notificationCount} unread notifications`
                  : "No new notifications"}
              </TooltipContent>
            </Tooltip>
            <span>
              Notifications
              {notificationCount > 0 ? ` (${notificationCount})` : ""}
            </span>
          </Link>
        </nav>

        <div className="site-nav-actions">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="site-icon-button site-notification-button"
                aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
                onClick={() => navigate("/notification")}
              >
                <Bell size={19} aria-hidden="true" />
                {notificationCount > 0 && (
                  <span className="site-notification-count">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" className="site-notification-tooltip">
              {notificationCount > 0
                ? `${notificationCount} unread notifications`
                : "No new notifications"}
            </TooltipContent>
          </Tooltip>
          <div className="site-user-menu" ref={accountMenuRef}>
            <Button
              variant="ghost"
              size="sm"
              className="site-user-trigger"
              aria-label={`Account menu for ${user?.name || "user"}`}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
            >
              <span
                className="site-avatar"
                style={{ backgroundColor: getAvatarColor(user?.name || "user") }}
                aria-hidden="true"
              >
                {initials}
              </span>
              <span className="site-user-name">{user?.name || "Account"}</span>
              <ChevronDown size={15} aria-hidden="true" />
            </Button>
            {accountOpen && (
              <div className="site-account-dropdown" role="menu">
                <div className="site-account-heading">
                  <span className="site-account-heading-name">
                    {user?.name || "Your account"}
                  </span>
                  {user?.email && (
                    <span className="site-account-email">{user.email}</span>
                  )}
                </div>
                <Link
                  to={accountPath}
                  role="menuitem"
                  className="site-account-menu-item"
                  onClick={closeAccountMenu}
                >
                  <UserRound size={17} aria-hidden="true" />
                  <span>Profile</span>
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className="site-account-menu-item"
                  onClick={handleLogout}
                >
                  <LogOut size={17} aria-hidden="true" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="site-icon-button site-menu-button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
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
