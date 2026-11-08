import React from "react";
import { Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import doctorImage from "../assets/login2.jpg";
import "../styles/auth.css";

const AuthLayout = ({ title, description, footer, children, doctorPhoto = false }) => doctorPhoto ? (
  <main className="auth-page">
    <div className="auth-showcase">
      <img src={doctorImage} alt="A smiling doctor" className="auth-doctor-image" />
    </div>
    <section className="auth-panel">
      <div className="auth-brand">
        <Stethoscope aria-hidden="true" />
        <span>DOCMED</span>
      </div>
      <div className="auth-content">
        <h1>{title}</h1>
        <p className="auth-description">{description}</p>
        {children}
        <div className="auth-footer">{footer}</div>
      </div>
    </section>
  </main>
) : (
  <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
    <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/50 lg:min-h-[620px] lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-14">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <Link to="/" className="relative inline-flex w-fit items-center gap-3 text-white no-underline">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-slate-950">
            <Stethoscope size={22} aria-hidden="true" />
          </span>
          <span className="text-xl font-bold tracking-[0.18em]">DOCMED</span>
        </Link>
        <div className="relative max-w-md">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">
            Healthcare, made simpler
          </p>
          <h2 className="text-4xl font-semibold leading-tight xl:text-5xl">
            Care that connects you to the right people.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-300">
            Find a doctor, manage appointments, and keep your care moving in one place.
          </p>
        </div>
        <p className="relative text-xs text-slate-400">Your care journey starts here.</p>
      </aside>

      <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-slate-950 no-underline lg:hidden">
            <Stethoscope size={21} className="text-sky-600" aria-hidden="true" />
            <span className="font-bold tracking-[0.16em]">DOCMED</span>
          </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
          </div>
          {children}
          <div className="mt-8 border-t border-slate-100 pt-6 text-center text-sm text-slate-500">
            {footer}
          </div>
        </div>
      </section>
    </div>
  </main>
);

export default AuthLayout;
