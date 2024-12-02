import { cn } from "@/utils/tailwind.util";
import React from "react";
import { UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label?: string | React.ReactNode;
  type?: "text" | "password";
  placeholder?: string;
  variant?: "filled" | "outlined";
  autoComplete?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors?: any;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  variant = "outlined",
  autoComplete,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <label
        htmlFor={`input-field-${name}`}
        className={cn("text-base font-medium leading-5", {
          hidden: !label,
        })}
      >
        {label}
      </label>
      <input
        className={cn(
          "w-full h-10 px-2 rounded-lg text-base leading-5 outline-none duration-300",
          {
            "border border-gray-300 bg-transparent hover:border-gray-500 focus:border-gray-500":
              variant === "outlined",
            "border border-transparent hover:border-gray-400 bg-gray-100 focus:border-gray-400 focus:bg-gray-200":
              variant === "filled",
          }
        )}
        type={type}
        id={`input-field-${name}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...(register && register(name))}
      />
      {errors && errors[name] && (
        <span className="px-2 text-sm font-normal leading-4 text-red-500">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export { InputField };
