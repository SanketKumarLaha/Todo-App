import { useTodoContext } from "../hooks/useTodoContext";
import { useUserContext } from "../hooks/useUserContext";
import { useEffect, useState } from "react";
import { CheckCircle2, Pencil, Trash2 } from "lucide-react";

const TodoList = ({ setEditedObject, setOpenModal }) => {
  const [error, setError] = useState("");

  const { todos, dispatch } = useTodoContext();
  const { user } = useUserContext();

  //fetching todos
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/todo",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();
      dispatch({ type: "GET_TODOS", payload: json });
    };
    if (user) fetchTodos();
  }, [dispatch, user]);

  //handling edit property
  const handleEdit = (item) => {
    setEditedObject(item);
    setOpenModal(true);
  };

  //handling delete property
  const handleDelete = async (item) => {
    //send a delete req
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/todo/" + item._id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    //dispatch a action in the context
    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  const handleFinished = async (itemId) => {
    //get the item and update the object
    const unfinishedItem = todos.find((item) => item._id === itemId);
    const updatedObject = {
      ...unfinishedItem,
      finished: !unfinishedItem.finished,
    };

    //get the itemIndex and update the array
    const unfinishedItemIndex = todos.findIndex((item) => item._id === itemId);
    todos[unfinishedItemIndex] = updatedObject;

    //send a patch req with updated body
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/todo/" + itemId,
      {
        method: "PATCH",
        body: JSON.stringify(updatedObject),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    //dispatch a action in the context
    if (response.ok) {
      dispatch({ type: "GET_TODOS", payload: todos });
    }
    if (!response.ok) {
      setError(json.error);
    }
  };

  return (
    <div className="w-5/6 sm:w-2/3 mb-10">
      {todos &&
        todos.map((item) => {
          let isFinished = todos.find((x) => x._id === item._id).finished;
          return (
            <div
              key={item._id}
              className="shadow-sm bg-[#F0F0F0] flex justify-between  mb-5 p-3 hover:bg-slate-300 cursor-pointer"
            >
              <div className="m-2">
                <CheckCircle2
                  fill={isFinished ? "green" : "white"}
                  color={isFinished ? "white" : "black"}
                  className="cursor-pointer mr-2"
                  onClick={() => handleFinished(item._id)}
                />
              </div>
              <div className="w-2/4">
                <h1
                  className={`text-xl leading-tight ${
                    isFinished ? "line-through" : "none"
                  }`}
                >
                  {item.taskname}
                </h1>
                <h1
                  className={`text-sm break-words ${
                    isFinished ? "line-through" : "none"
                  }`}
                >
                  {item.description}
                </h1>
              </div>
              <div className=" w-1/4 flex mt-1 justify-end">
                <div
                  className=" cursor-pointer mr-5"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil />
                </div>
                <div
                  className=" cursor-pointer"
                  onClick={() => handleDelete(item)}
                >
                  <Trash2 />
                </div>
                {error && <p>{error}</p>}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TodoList;
