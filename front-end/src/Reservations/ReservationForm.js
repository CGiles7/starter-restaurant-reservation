import React from "react";

function ReservationForm({
  formData,
  handleInputChange,
  handleSubmit,
  handleCancel,
  errors,
}) {
  return (
    <div>
      <h1>New Reservation</h1>
      <ErrorAlert errors={errors} />
      <form onSubmit={handleSubmit}>
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
        {/* Add similar code for other input fields */}
        <button type="submit">Submit</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default ReservationForm;