import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/api/v1/users/register", form);
      alert("Registered successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} /><br /><br />
        <input name="email" placeholder="Email" onChange={handleChange} /><br /><br />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} /><br /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;