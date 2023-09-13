import React, { useEffect, useState } from "react";
import "./TeacherPage.css";

const TeacherPage = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:4500/api/user/getAllStudents";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.message);
        }
        setStudents(data.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h2>Student List</h2>
      {error && <p className="error">{error}</p>}
      <table className="table table-bordered table-primary table-striped ">
        <thead>
          <tr>
            <th>Slno</th>
            <th>Email</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.email}>
              <td>{index + 1}</td>
              <td>{student.email}</td>
              <td>{student.name}</td>
              <td>{student.contact}</td>
              <td>
                <a
                  href={student.file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                {" | "}
                <a
                  href={student.file}
                  download
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherPage;
