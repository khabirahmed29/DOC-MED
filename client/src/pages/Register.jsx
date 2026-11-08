import React from "react";
import { message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import AuthLayout from "../components/AuthLayout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      if (res.data.success) {
        message.success("Account created successfully.");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Unable to register right now.");
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <AuthLayout
      doctorPhoto
      title="Create A New Account"
      description="Get started managing your healthcare in one place."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-900">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="sr-only">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="name"
            autoComplete="name"
            maxLength={80}
            required
            className="h-14 rounded-xl border-slate-200 bg-white px-4 text-base shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="sr-only">Email address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            autoComplete="email"
            required
            className="h-14 rounded-xl border-slate-200 bg-white px-4 text-base shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="sr-only">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={128}
            required
            className="h-14 rounded-xl border-slate-200 bg-white px-4 text-base shadow-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </div>
        <Button
          type="submit"
          className="w-fit rounded-lg bg-slate-950 px-8 font-sans text-base font-semibold text-white shadow-md hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          Sign Up
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
