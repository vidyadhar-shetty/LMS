import React, { useState } from "react";
import axios from "axios";

const StudentPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    contact: "",
    pdfFile: null,
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pdfFile: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { email, name, contact, pdfFile } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("email", email);
    formDataToSend.append("name", name);
    formDataToSend.append("contact", contact);
    formDataToSend.append("file", pdfFile);

    try {
      const response = await axios.post(
        "http://localhost:4500/api/user/updateStudentDetails",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        setError(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Verify that either your email or the file is in PDF format");
    }
  };

  return (
    <div>
      <h2>Update Student Details</h2>
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
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload PDF:</label>
          <input
            type="file"
            name="pdfFile"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default StudentPage;
