import { cn } from "@/utils/tailwind.util";
import React from "react";

interface LoaderProps {
  className?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center justify-center w-3 h-3 rounded-full bg-primary">
        <div className="w-3 h-3 bg-white border rounded-full animate-loader-scale1 border-primary" />
      </div>
      <div className="flex items-center justify-center w-3 h-3 rounded-full bg-primary">
        <div className="w-3 h-3 bg-white border rounded-full animate-loader-scale2 border-primary" />
      </div>
      <div className="flex items-center justify-center w-3 h-3 rounded-full bg-primary">
        <div className="w-3 h-3 bg-white border rounded-full animate-loader-scale3 border-primary" />
      </div>
    </div>
  );
};

export { Loader };
