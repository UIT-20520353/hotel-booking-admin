import appConstants from "@/constants/app";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Header from "./header";
import Sidebar from "./sidebar";
import { authenticationApi } from "@/api";

const MainLayout: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [accessToken] = useLocalStorage(
    appConstants.ACCESS_TOKEN_KEY,
    undefined
  );

  const getProfile = () => {
    authenticationApi
      .getProfile()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      getProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="flex items-start w-full min-h-screen bg-lavender-gray">
      <Sidebar />
      <main className="flex-1 h-10 bg-red-400">
        <Header />
      </main>
    </div>
  );
};

export default MainLayout;
