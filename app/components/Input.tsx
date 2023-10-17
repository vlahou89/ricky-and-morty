import React from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-2/3 sm:w-auto bg-gray-800 border border-sky-500 text-white text-sm rounded-lg focus:ring-lime-300 focus:border-lime-300 block p-2 mb-4 ${className}`}
    />
  );
};

export default Input;
