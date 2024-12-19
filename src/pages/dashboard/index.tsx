import { administrativeApi } from "@/api/administrative";
import { provinceApi } from "@/api/provinceApi";
import { MarkerIcon } from "@/assets/icons";
import { Button } from "@/components/common";
import appConstants from "@/constants/app";
import React, { useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const Dashboard: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [accessToken, , removeAccessToken] = useLocalStorage(
    appConstants.ACCESS_TOKEN_KEY,
    ""
  );

  const getProvinces = async () => {
    const response = await administrativeApi.getAllRegions();
    console.log(response);
  };

  const onLogout = () => {
    removeAccessToken();
  };

  useEffect(() => {
    getProvinces();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate, accessToken]);

  return (
    <div className="w-full h-screen">
      {/* <Map
        mapboxAccessToken={appConstants.VITE_MAP_BOX_KEY}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/fle-biha/clo5rljhj00q901qv3xi3478c"
      >
        <Marker longitude={-122.4} latitude={37.8}>
          <MarkerIcon color="red" />
        </Marker>
      </Map> */}
      <Button text="Click me" onClick={onLogout} />
    </div>
  );
};

export default Dashboard;
