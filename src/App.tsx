import LoginPage from "@/pages/authentication/login";
import Dashboard from "@/pages/dashboard";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";

const App: React.FunctionComponent = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
    </Route>
  </Routes>
);

export default App;
