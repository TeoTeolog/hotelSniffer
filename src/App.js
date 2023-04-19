import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes.js";
import { useSelector } from "react-redux";
// import './css/App.css'
// import './css/style.css'

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const routes = useRoutes(isAuthenticated);
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
