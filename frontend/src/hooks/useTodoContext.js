import { useContext } from "react";
import { TodoContext } from "../context/TodoContextProvider";

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw Error("Outside the scope of TodoContext Context");
  }
  return context;
};
