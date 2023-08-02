import React from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useTodoContext } from "../hooks/useTodoContext";

const UserDetails = () => {
  const { user, dispatch } = useUserContext();
  const { dispatch: todoDispatch } = useTodoContext();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    todoDispatch({ type: "GET_TODOS", payload: null });
  };
  return (
    <>
      <h1 className="">{user && <h1>{user.newUser.email}</h1>}</h1>
      <button
        onClick={handleLogOut}
        className="bg-slate-400 text-white rounded px-2 py-1 mt-1 text-sm hover:bg-slate-500"
      >
        Logout
      </button>
    </>
  );
};

export default UserDetails;
