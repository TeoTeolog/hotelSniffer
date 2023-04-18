import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return <Routes></Routes>;
  } else
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    );
};
