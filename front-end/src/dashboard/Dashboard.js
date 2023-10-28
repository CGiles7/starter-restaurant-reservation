import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { formatDateAsISO } from "../utils/date-time";

function Dashboard() {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryDate = searchParams.get("date");
  const [date, setDate] = useState(queryDate || formatDateAsISO(new Date()));
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(() => {
    loadDashboard(date);
  }, [date]);

  function loadDashboard(selectedDate) {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date: selectedDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    return () => abortController.abort();
  }

  const handleDateChange = (amount) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + amount);
    const formattedDate = formatDateAsISO(newDate);
    setDate(formattedDate);
    history.push(`/dashboard?date=${formattedDate}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
        <button
          className="btn btn-primary ml-md-2"
          onClick={() => handleDateChange(-1)}
        >
          Previous
        </button>
        <button className="btn btn-primary ml-2" onClick={() => handleDateChange(1)}>
          Next
        </button>
        <button className="btn btn-secondary ml-2" onClick={() => handleDateChange(0)}>
          Today
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* Render reservations */}
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reservation_id}>
            {/* Display reservation details */}
            {reservation.reservation_time} - {reservation.last_name}, {reservation.first_name} - Party of {reservation.people}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Dashboard;