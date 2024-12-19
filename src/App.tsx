import MainLayout from "@/components/layout/main-layout";
import Attractions from "@/pages/attractions";
import AddAttraction from "@/pages/attractions/add-attraction";
import LoginPage from "@/pages/authentication/login";
import Dashboard from "@/pages/dashboard";
import Users from "@/pages/users";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

const App: React.FunctionComponent = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/*" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="attractions" element={<Attractions />} />
      <Route path="attractions/add" element={<AddAttraction />} />
      <Route path="users" element={<Users />} />
    </Route>
  </Routes>
);

export default App;
