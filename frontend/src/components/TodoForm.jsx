import React, { useEffect, useState } from "react";
import { useTodoContext } from "../hooks/useTodoContext";
import { useUserContext } from "../hooks/useUserContext";

const TodoForm = ({
  editedObject,
  setEditedObject,
  setOpenModal,
  openModal,
  modalRef,
}) => {
  const { todos, dispatch } = useTodoContext();
  const { user } = useUserContext();

  const [error, setError] = useState("");

  const [taskname, setTaskname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTaskname(editedObject.taskname);
    setDescription(editedObject.description);
  }, [editedObject]);

  const id = editedObject._id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { taskname, description };
    if (id) {
      //send a update req
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/todo/" + id,
        {
          method: "PATCH",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        //dispatch a action in the context
        const foundTodoIndex = todos.findIndex((item) => item._id === id);
        let foundTodo = todos[foundTodoIndex];
        todos[foundTodoIndex] = { ...foundTodo, ...body };
        dispatch({ type: "GET_TODOS", payload: todos });
      }
      if (!response.ok) {
        setError(json.error);
      }
      setEditedObject({
        taskname: "",
        description: "",
      });
    } else {
      //send a post req
      const response = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/api/todo/",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      //dispatch a action in the context
      if (response.ok) {
        dispatch({ type: "CREATE_TODO", payload: json });
        setTaskname("");
        setDescription("");
        setError("");
      }
      if (!response.ok) {
        setError(json.error);
      }
    }
    setOpenModal(false);
  };

  //modal cancel/close property
  const handleCancel = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };

  return (
    <div className={`w-2/6 ${openModal ? "flex" : "hidden"} justify-center`}>
      <dialog
        ref={modalRef}
        className="p-10 w-5/6 sm:w-3/5 md:w-3/5 lg:w-2/5 rounded backdrop:opacity-10 backdrop:bg-black"
      >
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col w-full"
        >
          <input
            type="text"
            id="taskname"
            value={taskname}
            placeholder="Task name"
            autoComplete="off"
            onChange={(e) => setTaskname(e.target.value)}
            className="text-lg font-medium outline-none"
          />
          <textarea
            type="text"
            id="description"
            value={description}
            placeholder="Description"
            autoComplete="off"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-full resize-none text-lg font-medium outline-none my-1"
          />
          <div className="flex justify-end ">
            <button
              onClick={handleCancel}
              className="bg-gray-100 px-3 py-1 mr-3 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="bg-slate-500 opacity-90 px-3 py-1 text-white rounded hover:opacity-100">
              {id ? "Save" : "Add task"}
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </dialog>
    </div>
  );
};

export default TodoForm;
