import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import "../App.css";

export default function ViewResult() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const fromDate = state?.fromDate;
  const toDate = state?.toDate;

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ This stops double loading
  const hasFetched = useRef(false);


  const formatDate = (d) => {
    return new Date(d).toISOString().split("T")[0];
  };


  useEffect(() => {

    // 🔴 Stop second run
    if (hasFetched.current) return;

    hasFetched.current = true;

    if (!fromDate || !toDate) return;

    fetchNotes();

  }, [fromDate, toDate]);


  const fetchNotes = async () => {

    try {

      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/notes");
      const data = await res.json();

      const start = formatDate(fromDate);
      const end = formatDate(toDate);

      const filtered = data.filter(n =>
        n.created_date >= start &&
        n.created_date <= end
      );

      setNotes(filtered);

    } catch (err) {
      console.log("Error:", err);

    } finally {
      setLoading(false);
    }
  };


  // -------- DELETE --------
  const deleteNote = async (id) => {

    if (!window.confirm("Delete this note?")) return;

    await fetch(`http://127.0.0.1:8000/notes/${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  };


  return (

    <div className="write-page">

      <h2>Teachers Notes</h2>

      <p>
        <strong>From:</strong>{" "}
        {new Date(fromDate).toDateString()} <br />

        <strong>To:</strong>{" "}
        {new Date(toDate).toDateString()}
      </p>


      {loading ? (

        <p>Loading...</p>

      ) : notes.length === 0 ? (

        <p>No data found</p>

      ) : (

        <div className="table-wrapper">

          <table className="teacher-table" border="1">

            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Prepared</th>
                <th>Did Well</th>
                <th>Went Well</th>
                <th>Improve</th>
                <th>Homework</th>
                <th>Action</th>
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

                  <td>

                    <button
                      onClick={() =>
                        alert("Edit feature coming soon 😄")
                      }
                    >
                      Edit
                    </button>

                    {" "}

                    <button
                      onClick={() => deleteNote(n.id)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      <br />

      <button onClick={() => navigate(-1)}>
        Back
      </button>

    </div>
  );
}
