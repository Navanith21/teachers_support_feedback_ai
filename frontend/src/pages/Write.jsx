import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function Write() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="write-page">
      <h2 className="write-title">Daily Reflection</h2>

      {/* ✅ Calendar-style Date Picker */}
      <div className="form-group">
        <label>Date</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="calendar-input"
          showPopperArrow={false}
        />
      </div>

      <div className="form-group">
        <label>What I prepared</label>
        <textarea />
      </div>

      <div className="form-group">
        <label>What I did well</label>
        <textarea />
      </div>

      <div className="form-group">
        <label>What went well</label>
        <textarea />
      </div>

      <div className="form-group">
        <label>Where to improve</label>
        <textarea />
      </div>

      <div className="form-group">
        <label>What homework did I give today</label>
        <textarea />
      </div>

      <div className="write-actions">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="save-btn">Save</button>
      </div>
    </div>
  );
}
