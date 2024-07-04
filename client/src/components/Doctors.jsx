import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row } from "antd";
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
      <div className="box-container">
        <h3 className="sub-heading"> Our Doctors </h3>
        <h1 className="heading"> Best around you </h1>
        <Row>
          {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
        </Row>
      </div>
    </section>
  );
};

export default Doctors;
