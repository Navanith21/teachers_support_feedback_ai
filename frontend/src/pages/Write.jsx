import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";

export default function Write() {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  return (
    <div className="write-page">
      <div className="write-header">
        <h3>Write Notes</h3>
      </div>

      <div className="write-card">
        {/* DATE PICKER */}
        <label>Date</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          className="date-input"
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />

        <label>What I prepared</label>
        <textarea rows="2" />

        <label>What I did well</label>
        <textarea rows="2" />

        <label>What went well</label>
        <textarea rows="2" />

        <label>Where to improve</label>
        <textarea rows="2" />

        <label>What homework did I give today</label>
        <textarea rows="2" />

        <div className="write-actions">
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            Back
          </button>
          <button className="btn-save">Save</button>
        </div>
      </div>
    </div>
  );
}
