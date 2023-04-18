import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes.js";
// import {AuthContext} from './context/AuthContext'
// import './css/App.css'
// import './css/style.css'

function App() {
  // const { login, logout, refreshingAccess, userId, token, refreshToken, ready} = useAuth()
  // const isAuthenticated = !!token
  // const routes = useRoutes(isAuthenticated)
  const routes = useRoutes(false);
  if (!true) {
    return <p>ТУТ должен быть loader </p>;
  }
  return (
    <BrowserRouter>
      <div className="container">{routes}</div>
    </BrowserRouter>
  );
}

export default App;
