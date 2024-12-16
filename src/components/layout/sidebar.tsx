import React from "react";

const Sidebar: React.FunctionComponent = () => {
  return (
    <aside className="h-screen overflow-auto text-black bg-white w-60">
      <div className="flex items-center justify-center w-full text-2xl font-bold text-primary h-70px">
        Logo
      </div>
    </aside>
  );
};

export { Sidebar };
