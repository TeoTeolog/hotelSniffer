import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { HotelsPage } from "./pages/HotelsPage";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<HotelsPage />} />
      </Routes>
    );
  } else
    return (
      <Routes>
        <Route path="/" element={<AuthPage />} />
      </Routes>
    );
};
