import React from "react";

const Sidebar: React.FunctionComponent = () => {
  return (
    <aside className="h-screen overflow-auto text-black bg-white w-72">
      <div className="flex items-center justify-center w-full h-16 text-2xl font-bold text-primary">
        Logo
      </div>
    </aside>
  );
};

export default Sidebar;
