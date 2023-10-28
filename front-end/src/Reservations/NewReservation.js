import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // ... (remaining handleSubmit code)
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <ReservationForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      errors={errors}
    />
  );
}

export default NewReservation;