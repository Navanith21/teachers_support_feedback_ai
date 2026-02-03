import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

export default function ViewResult() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const fromDate = state?.fromDate;
  const toDate = state?.toDate;

  return (
    <div className="write-page">
      <h2 className="write-title">Teachers Notes</h2>

      <p>
        <strong>From:</strong>{" "}
        {fromDate ? new Date(fromDate).toDateString() : "-"} <br />
        <strong>To:</strong>{" "}
        {toDate ? new Date(toDate).toDateString() : "-"}
      </p>

      <div className="table-wrapper">
        <table className="teacher-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Prepared</th>
              <th>Did Well</th>
              <th>Went Well</th>
              <th>Improve</th>
              <th>Homework</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Nov 3, 2025</td>
              <td>Patchaiyappan</td>
              <td>Data Analytics</td>
              <td>Explained chapter 4</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>
                <button className="link-btn edit">Edit</button>
                <button className="link-btn delete">Delete</button>
              </td>
            </tr>

            <tr>
              <td>Nov 6, 2025</td>
              <td>Ravishankar</td>
              <td>Routing Concepts</td>
              <td>Routing table explained</td>
              <td>Switch configured</td>
              <td>Need practice</td>
              <td>Seminar topics</td>
              <td>
                <button className="link-btn edit">Edit</button>
                <button className="link-btn delete">Delete</button>
              </td>
            </tr>
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
