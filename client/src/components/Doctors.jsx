import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorList from "./DoctorList";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <section id="doctors" className="home-section">
      <div className="library">
        <p className="home-section-kicker">Meet your care team</p>
        <h2 className="home-section-heading">Doctors near you</h2>
        <div className="home-doctor-grid">
          {doctors?.length ? doctors.map((doctor) => (
            <DoctorList key={doctor._id} doctor={doctor} />
          )) : <div className="app-empty-state">No doctors are available right now.</div>}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
