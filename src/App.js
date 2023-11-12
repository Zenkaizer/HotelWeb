import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainScreen from "./components/MainScreen/MainScreen";
import Login from "./components/login/Login";
import Register from "./components/Register/Register";
import "react-toastify/dist/ReactToastify.css";
import CustomerHome from "./components/CustomerHome";
import AdminHome from "./components/AdminHome";
import AdministrativeHome from "./components/AdministrativeHome";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainScreen />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {token ? (
            <>
              <Route path="/home" element={<CustomerHome />} />
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/administrative" element={<AdministrativeHome />} />
            </>
          ) : (
            <>
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/admin" element={<Navigate to="/" replace />} />
              <Route
                path="/administrative"
                element={<Navigate to="/" replace />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
