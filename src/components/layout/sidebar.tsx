import { IcOutlinePlace, LucideUsers, UilChartLine } from "@/components/icons";
import { appURL } from "@/constants/url";
import { Button } from "@nextui-org/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="sticky top-0 h-screen max-h-screen overflow-auto text-black bg-white w-72">
      <div className="flex items-center justify-center w-full h-16 text-2xl font-bold text-primary">
        Logo
      </div>

      <div className="flex flex-col items-start w-full gap-2 p-5">
        <Button
          onPress={() => navigate(appURL.HOME)}
          className="justify-start text-lg font-semibold"
          color={location.pathname === appURL.HOME ? "primary" : "default"}
          startContent={<UilChartLine width={32} height={32} />}
          size="lg"
          fullWidth
        >
          Dashboard
        </Button>
        <Button
          onPress={() => navigate(appURL.ATTRACTIONS)}
          className="justify-start text-lg font-semibold"
          color={
            location.pathname === appURL.ATTRACTIONS ? "primary" : "default"
          }
          startContent={<IcOutlinePlace width={32} height={32} />}
          size="lg"
          fullWidth
        >
          Attractions
        </Button>
        <Button
          onPress={() => navigate(appURL.USERS)}
          className="justify-start text-lg font-semibold"
          color={location.pathname === appURL.USERS ? "primary" : "default"}
          startContent={<LucideUsers width={32} height={32} />}
          size="lg"
          fullWidth
        >
          Users
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
