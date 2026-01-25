import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function ViewResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const { fromDate, toDate } = location.state || {};

  // TEMP sample data (later replace with backend / Firestore)
  const data = [
    {
      date: "Nov 3, 2025",
      name: "Patchaiyappan",
      prepared: "Data Analytics",
      didWell: "Explained chapter 4 clearly",
      wentWell: "-",
      improve: "-",
      homework: "-",
    },
    {
      date: "Nov 6, 2025",
      name: "Ravishankar",
      prepared: "Routing Concepts",
      didWell: "Routing table explanation",
      wentWell: "Switches configured",
      improve: "Students need practice",
      homework: "Seminar topics",
    },
  ];

  return (
    <div className="write-page">
      <h2 className="write-title">
        Software Development – Teacher Notes
      </h2>

      <p>
        <b>From:</b> {fromDate?.toDateString()} &nbsp;&nbsp;
        <b>To:</b> {toDate?.toDateString()}
      </p>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table className="notes-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>What I prepared for class</th>
              <th>What I did well</th>
              <th>What went well</th>
              <th>Where to improve</th>
              <th>Homework given</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.name}</td>
                <td>{row.prepared}</td>
                <td>{row.didWell}</td>
                <td>{row.wentWell}</td>
                <td>{row.improve}</td>
                <td>{row.homework}</td>
                <td>
                  <button className="table-btn edit">Edit</button>
                  <button className="table-btn delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="write-actions">
        <button className="btn-back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}
