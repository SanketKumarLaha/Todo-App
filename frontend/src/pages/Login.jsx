import React, { useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { Link } from "react-router-dom";
import myImage from "../utils/images/bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const { dispatch } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { email, password };

    //send a post req of login
    const response = await fetch(
      process.env.REACT_APP_URL + "/api/user/login",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    //dispatch a action in the context
    if (response.ok) {
      dispatch({ type: "LOGIN", payload: json });
      localStorage.setItem("user", JSON.stringify(json));
      setEmail("");
      setPassword("");
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  return (
    <div className="w-screen h-screen bg-slate-300 md:flex">
      <div className="w-full lg:w-1/2 h-full bg-[#f9fbf8] text-black flex flex-col justify-center items-center font-poppins">
        <div className="w-3/4 md:w-1/2 h-1/2 flex flex-col justify-center items-center ">
          <div className="mb-5 flex flex-col items-center">
            <h1 className="text-3xl font-bold text-[#072f37]">Welcome back</h1>
            <p className="text-sm font-medium text-[#072f37]">
              Please enter your details
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="text-black flex flex-col p-5 m-2 justify-between w-full lg:w-5/6"
          >
            <div className="flex flex-col mb-3">
              <input
                type="text"
                id="email"
                value={email}
                placeholder="Enter your email"
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="rounded h-7 p-2 text-sm shadow-md "
              />
            </div>
            <div className="flex flex-col mb-3">
              <input
                type="text"
                id="password"
                value={password}
                placeholder="Enter your password"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="rounded h-7 p-2 text-sm shadow-md"
              />
            </div>
            <button className="bg-[#456641] text-white rounded p-1 mt-4 text-sm ">
              Sign in
            </button>
            {error && (
              <div className="my-1 border rounded border-red-600">
                <p className="text-md font-sans text-red-500 text p-1 px-2">
                  {error}
                </p>
              </div>
            )}
          </form>
          <p className="text-sm font-medium text-[#072f37]">
            Don't have an account?
            <span>
              <Link to={"/signup"}> Sign up</Link>
            </span>
          </p>
        </div>
      </div>
      <div
        className="hidden h-full bg-cover lg:w-1/2 lg:block"
        style={{ backgroundImage: `url(${myImage})` }}
      />
    </div>
  );
};

export default Login;
