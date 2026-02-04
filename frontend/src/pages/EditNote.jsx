import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditNote() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(state);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const update = async () => {

    await fetch(`http://127.0.0.1:8000/notes/${form.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Updated");
    navigate(-1);
  };

  return (
    <div>

      <h2>Edit Note</h2>

      <input
        name="username"
        value={form.username}
        onChange={change}
      />

      <input
        name="what_i_prepared"
        value={form.what_i_prepared}
        onChange={change}
      />

      <input
        name="what_i_did_well"
        value={form.what_i_did_well}
        onChange={change}
      />

      <input
        name="what_went_well"
        value={form.what_went_well}
        onChange={change}
      />

      <input
        name="where_to_improve"
        value={form.where_to_improve}
        onChange={change}
      />

      <input
        name="what_homework_did_i_give"
        value={form.what_homework_did_i_give}
        onChange={change}
      />

      <br /><br />

      <button onClick={update}>Update</button>

      <button onClick={() => navigate(-1)}>Back</button>

    </div>
  );
}
