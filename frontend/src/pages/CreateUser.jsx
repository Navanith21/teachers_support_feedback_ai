import axios from "axios";
import { useState } from "react";

export default function CreateUser() {
  const [form, setForm] = useState({});

  const submit = async () => {
    try {
      const data = new FormData();
      Object.keys(form).forEach(key => data.append(key, form[key]));

      await axios.post(
        "http://localhost:8000/users/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );

      alert("User created successfully");
    } catch (err) {
      alert("Error creating user");
      console.error(err);
    }
  };

  return (
    <>
      <h2>Create User</h2>
      <input placeholder="Username" onChange={e => setForm({...form, username: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
      <input placeholder="Full Name" onChange={e => setForm({...form, full_name: e.target.value})}/>
      <input type="file" onChange={e => setForm({...form, photo: e.target.files[0]})}/>
      <button onClick={submit}>Create User</button>
    </>
  );
}
