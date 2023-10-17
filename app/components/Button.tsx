import React from "react";
import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-lime-400  focus:outline-none focus:text-gray-800 flex right-0 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
