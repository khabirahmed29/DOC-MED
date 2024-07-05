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
    <section>
      <div className="library">
        <h3 className="sub-heading"> Our Doctors </h3>
        <h1 className="heading"> Best around you </h1>
        {/* <Row className="">
         */}
        <div className="box-container">
          {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
        </div>
        {/* </Row> */}
      </div>
    </section>
  );
};

export default Doctors;
