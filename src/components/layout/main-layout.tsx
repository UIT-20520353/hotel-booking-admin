import appConstants from "@/constants/app";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Header from "./header";
import Sidebar from "./sidebar";

const MainLayout: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage(
    appConstants.ACCESS_TOKEN_KEY,
    undefined
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="flex items-start w-full min-h-screen bg-lavender-gray">
      <Sidebar />
      <main className="flex-1">
        <Header />

        <div className="w-full min-h-[calc(100vh-64px)] p-8 border-l border-gray-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
