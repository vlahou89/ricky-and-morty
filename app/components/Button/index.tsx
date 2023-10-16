import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <button
      className={`bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-lime-400 hover:text-gray-800 focus:outline-none focus:text-gray-800 flex right-0 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
