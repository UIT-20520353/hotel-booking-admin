import React from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

const MainLayout: React.FunctionComponent = () => {
  return (
    <div className="flex items-start w-full min-h-screen bg-ghost-white">
      <Sidebar />
      <main className="flex-1 h-full">
        <Header />
      </main>
    </div>
  );
};

export default MainLayout;
