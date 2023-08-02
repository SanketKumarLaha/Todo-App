import { PlusCircle, UserCircle2 } from "lucide-react";
import React, { useState } from "react";
import UserDetails from "./UserDetails";

const Heading = ({ setOpenModal }) => {
  //form modal management
  const handleClick = () => {
    setOpenModal(true);
  };

  //user popup
  const [userModal, setUserModal] = useState(false);
  const handleUserClick = () => {
    userModal ? setUserModal(false) : setUserModal(true);
  };

  return (
    <div className="w-5/6 sm:w-2/3 flex justify-between items-center mt-5 mb-10 relative ">
      <h1 className="text-4xl font-extrabold text">Todo List</h1>
      <div className="group relative ">
        <PlusCircle
          className=" cursor-pointer rounded-full hover:bg-slate-200"
          onClick={handleClick}
        />
        <span className="absolute p-2 invisible whitespace-nowrap border border-black bg-white group-hover:visible">
          Add todo
        </span>
      </div>
      <div className="group relative ">
        <UserCircle2
          className=" cursor-pointer  rounded-full hover:bg-slate-200"
          onClick={handleUserClick}
        />
        <span className="absolute p-2 invisible whitespace-nowrap border border-black bg-white group-hover:visible">
          User
        </span>
      </div>
      <div
        className={`bg-white absolute rounded right-0 top-12 p-4 shadow-lg ${
          userModal ? "block" : "hidden"
        } `}
      >
        <UserDetails />
      </div>
    </div>
  );
};

export default Heading;
