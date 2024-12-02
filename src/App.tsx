import Dashboard from "@/pages/dashboard";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

const App: React.FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
);

export default App;