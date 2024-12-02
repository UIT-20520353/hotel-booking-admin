import { cn } from "@/utils/tailwind.util";
import React from "react";
import { Loader } from "./loader";

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FunctionComponent<ButtonProps> = ({
  className,
  text,
  onClick,
  isLoading = false,
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      className={cn(
        "bg-primary text-white h-10 px-5 rounded-full hover:bg-primary-dark-shade duration-300 disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed",
        {
          "flex items-center justify-center disabled:hover:bg-primary disabled:bg-primary":
            isLoading,
        },
        className
      )}
      onClick={onClick}
      disabled={isLoading || disabled}
      type={type}
    >
      {isLoading ? <Loader className="w-fit" /> : text}
    </button>
  );
};

export { Button };
