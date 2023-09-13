import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import StudentPage from "./components/StudentPage";
import TeacherPage from "./components/TeacherPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const navigation = () => {
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Navigate to="/login" />
              ) : (
                <SignUp onSignUpSuccess={navigation} />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
