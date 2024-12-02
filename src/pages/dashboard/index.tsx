import { MarkerIcon } from "@/assets/icons";
import appConstants from "@/constants/app";
import React from "react";
import Map, { Marker } from "react-map-gl";

const Dashboard: React.FunctionComponent = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen text-red-700">
      <Map
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
      </Map>
    </div>
  );
};

export default Dashboard;
