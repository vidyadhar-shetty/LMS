import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4500/api/user/signup", formData);
      console.log(response.data)
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data)
      alert(error.response.data.message);
    }
  };
  const routeToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === "student"}
                onChange={handleChange}
              />
              Student
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="teacher"
                checked={formData.role === "teacher"}
                onChange={handleChange}
              />
              Teacher
            </label>
          </div>
        </div>
        <button type="submit">Sign Up</button>
        <button type="submit" onClick={routeToLogin}>Login</button>
      </form>
    </div>
  );
};

export default SignUp;
