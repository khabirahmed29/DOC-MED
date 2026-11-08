import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";

const getNotificationPath = (notification) => {
  if (notification.type === "apply-doctor-request" || notification.data?.doctorId) {
    return "/admin/doctors";
  }
  return notification.data?.onClickPath || notification.onClickPath || "/notification";
};

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  //   handle read notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("somthing went wrong");
    }
  };

  // delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("Somthing Went Wrong In Ntifications");
    }
  };
  return (
    <>
      <Layout />
      <main className="app-page">
      <p className="home-section-kicker" style={{ textAlign: "left" }}>Your updates</p>
      <h1 className="app-page-heading">Notifications</h1>
      <p className="app-page-description">Stay up to date with your care and appointments.</p>
      <Tabs className="notification-tabs">
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="notification-actions">
            <Button type="button" variant="outline" className="app-action-button app-action-button-secondary" onClick={handleMarkAllRead}>
              <CheckCheck size={16} aria-hidden="true" /> Mark all as read
            </Button>
          </div>
          <div className="notification-list">
            {user?.notifcation?.length ? user.notifcation.map((notificationMgs, index) => (
              <button key={notificationMgs._id || notificationMgs.date || index} type="button" className="notification-item" onClick={() => navigate(getNotificationPath(notificationMgs))}>
                <span className="notification-icon"><Bell size={17} aria-hidden="true" /></span>
                <span>{notificationMgs.message}</span>
              </button>
            )) : <div className="app-empty-state">You’re all caught up. No unread notifications.</div>}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="notification-actions">
            <Button type="button" variant="outline" className="app-action-button app-action-button-danger" onClick={handleDeleteAllRead}>
              <Trash2 size={16} aria-hidden="true" /> Delete all read
            </Button>
          </div>
          <div className="notification-list">
            {user?.seennotification?.length ? user.seennotification.map((notificationMgs, index) => (
              <button key={notificationMgs._id || notificationMgs.date || index} type="button" className="notification-item is-read" onClick={() => navigate(getNotificationPath(notificationMgs))}>
                <span className="notification-icon"><Bell size={17} aria-hidden="true" /></span>
                <span>{notificationMgs.message}</span>
              </button>
            )) : <div className="app-empty-state">No read notifications yet.</div>}
          </div>
        </Tabs.TabPane>
      </Tabs>
      </main>
    </>
  );
};

export default NotificationPage;
