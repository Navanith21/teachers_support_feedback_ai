import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

export default function ViewResult() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const fromDate = state?.fromDate;
  const toDate = state?.toDate;

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format date as YYYY-MM-DD
  const formatDate = (d) => {
    return new Date(d).toISOString().split("T")[0];
  };

  useEffect(() => {

    if (!fromDate || !toDate) return;

    fetchNotes();

  }, [fromDate, toDate]);   // 👈 Important: only when dates change

  const fetchNotes = async () => {

    try {

      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/notes");
      const data = await res.json();

      const start = formatDate(fromDate);
      const end = formatDate(toDate);

      // Filter by date
      const filtered = data.filter((n) => {
        return (
          n.created_date >= start &&
          n.created_date <= end
        );
      });

      // ✅ Remove duplicates by id
      const unique = Array.from(
        new Map(filtered.map(item => [item.id, item])).values()
      );

      setNotes(unique);

    } catch (err) {
      console.log("Error:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="write-page">

      <h2 className="write-title">Teachers Notes</h2>

      <p>
        <strong>From:</strong>{" "}
        {fromDate ? new Date(fromDate).toDateString() : "-"} <br />

        <strong>To:</strong>{" "}
        {toDate ? new Date(toDate).toDateString() : "-"}
      </p>

      {loading ? (
        <p>Loading...</p>

      ) : notes.length === 0 ? (
        <p>No data found.</p>

      ) : (

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
              </tr>
            </thead>

            <tbody>
              {notes.map((n) => (
                <tr key={n.id}>
                  <td>{n.created_date}</td>
                  <td>{n.username}</td>
                  <td>{n.what_i_prepared}</td>
                  <td>{n.what_i_did_well}</td>
                  <td>{n.what_went_well}</td>
                  <td>{n.where_to_improve}</td>
                  <td>{n.what_homework_did_i_give}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

      <button
        className="btn-back"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

    </div>
  );
}
