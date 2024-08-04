import React from "react";
// import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { login2 } from "../assets";
import "../styles/log.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <section className="sign-up" id="sign-up">
      <div className="row">
        <div className="image ">
          <img src={login2} alt="" />
        </div>
        <div className="form">
          <Link to="/login" className="xyz">
            <a class="logo">
              <i class="fa-solid fa-user-doctor"></i> DOCMED
            </a>
          </Link>
          <br />
          <br />
          <br />
          <h3 className="sub-heading">Login to your account</h3>
          <div className="input-form ">
            <Form
              layout="vertical"
              onFinish={onfinishHandler}
              className="form2"
            >
              <Form.Item name="email">
                <Input placeholder="email" type="email" id="email" required />
              </Form.Item>
              <Form.Item name="password">
                <Input
                  placeholder="password"
                  type="password"
                  id="password"
                  required
                />
              </Form.Item>
              <button className="btn" type="submit">
                Login
              </button>
              <p>
                New to DOCMED ?{" "}
                <a className="signUp">
                  <Link to="/register"> Join Now</Link>
                </a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
