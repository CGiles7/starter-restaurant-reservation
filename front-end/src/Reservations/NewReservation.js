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
  
    try {
      const response = await fetch(`${API_BASE_URL}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });
  
      if (response.status === 201) {
        const reservationDate = formData.reservation_date;
        history.push(`/dashboard?date=${reservationDate}`);
      } else {
        const responseData = await response.json();
        setErrors([responseData.error]);
      }
    } catch (error) {
      console.error(error);
      setErrors(["An unexpected error occurred."]);
    }
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