import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TodoContextProvider } from "./context/TodoContextProvider";
import { UserContextProvider } from "./context/UserContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </UserContextProvider>
);
