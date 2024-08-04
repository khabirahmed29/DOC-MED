import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";

import { login2 } from "../assets";
import "../styles/sign.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
      message.error("Something Went Wrong");
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
          <h3 className="sub-heading">Create a new account</h3>
          <div className="input-form ">
            <Form
              layout="vertical"
              onFinish={onfinishHandler}
              className="form2"
            >
              <Form.Item name="name">
                <Input placeholder="name" type="text" required />
              </Form.Item>
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
                Sign Up
              </button>
              <p className="login">
                Already have a docmed account ?{" "}
                <a className="signUp">
                  <Link to="/login"> Sign in</Link>
                </a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
