import React from "react";
import Image from "next/image";
import Input from "@/app/components/Input";

interface HeaderProps {
  searchTerm: string;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ searchTerm, handleSearchInput }) => {
  return (
    <div className="sticky top-0 bg-gray-800 mb-4 z-10">
      <div className="flex sm:flex-row sm:justify-between max-w-6xl px-2 m-auto">
        <Image
          alt="logo"
          src="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png"
          height={200}
          width={300}
          className="flex m-auto sm:m-0 -mt-12"
        />
        <div className="flex justify-center h-16 w-40 my-auto">
          <Input
            name="query"
            type="search"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={handleSearchInput}
            className=" bg-gray-800 border border-sky-500 text-white text-sm rounded-lg focus:ring-lime-300 focus:border-lime-300 block p-2 mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
