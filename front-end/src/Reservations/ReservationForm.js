import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ submitHandler, initialFormData }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <ErrorAlert errors={errors} />
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Mobile Number:
        <input
          type="tel"
          name="mobile_number"
          value={formData.mobile_number}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Date of Reservation:
        <input
          type="date"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={handleInputChange}
          required
          placeholder="YYYY-MM-DD"
          pattern="\d{4}-\d{2}-\d{2}"
        />
      </label>
      <label>
        Time of Reservation:
        <input
          type="time"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={handleInputChange}
          required
          placeholder="HH:MM"
          pattern="[0-9]{2}:[0-9]{2}"
        />
      </label>
      <label>
        Number of People:
        <input
          type="number"
          name="people"
          value={formData.people}
          onChange={handleInputChange}
          min="1"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReservationForm;