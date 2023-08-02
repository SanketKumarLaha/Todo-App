import React, { useEffect, useRef, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import Heading from "../components/Heading";

const Home = () => {
  const [editedObject, setEditedObject] = useState({
    taskname: "",
    description: "",
  });

  //modal
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const { current: el } = modalRef;
    if (openModal) el.showModal();
    else el.close();
  }, [openModal]);

  return (
    <div className=" w-full flex justify-center font-poppins min-h-screen   bg-[#ece9e9]">
      <div className="w-full  text-black flex flex-col items-center pt-10  lg:w-1/2">
        <Heading setOpenModal={setOpenModal} />
        <TodoList
          setEditedObject={setEditedObject}
          setOpenModal={setOpenModal}
        />
        <TodoForm
          editedObject={editedObject}
          setEditedObject={setEditedObject}
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalRef={modalRef}
        />
      </div>
    </div>
  );
};

export default Home;
