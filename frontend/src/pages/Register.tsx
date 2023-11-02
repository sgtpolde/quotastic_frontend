import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../stores/userContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [image, setImage] = useState(""); // You can handle image upload as needed

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, firstName, lastName, image);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (display error message, etc.)
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-24 sm:justify-center sm:pt-8 bg-white">
      <div>
        <h1 className="text-4xl text-black text-center">
          What is your<span className="text-primary"> name?</span>
        </h1>
        <h2 className="text-center text-black">
          Your name will appear on quotes and your public profile
        </h2>
        <div className="pt-2">
          <img
            className="h-16 w-16 object-cover rounded-full mx-auto"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
            alt="Current profile"
          />
        </div>
      </div>
      <div className="w-full px-6 py-0 mt-6 overflow-hidden sm:max-w-lg sm:rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Email
            </label>
            <div className="flex flex-col items-start">
              <input
                type="email"
                name="email"
                value={email}
                className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl border-solid"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-row w-auto">
            <div className="w-1/2">
              <label
                htmlFor="first_name"
                className="block text-sm font-medium text-black undefined mt-4"
              >
                First Name
              </label>
              <div className="flex flex-col items-start ">
                <input
                  type="text"
                  name="first_name"
                  value={firstName}
                  className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl shadow-sm "
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-1/2 ml-4">
              <label
                htmlFor="last_name"
                className="block text-sm font-medium text-gray-700 undefined mt-4"
              >
                Last name
              </label>
              <div className="flex flex-row items-start">
                <input
                  type="text"
                  name="last_name"
                  value={lastName}
                  className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl shadow-sm"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password"
                value={password}
                className="block w-full px-4 py-2 mt-1  border-2 border-primary rounded-3xl shadow-sm "
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700 undefined"
            >
              Confirm Password
            </label>
            <div className="flex flex-col items-start">
              <input
                type="password"
                name="password_confirmation"
                value={passwordConfirm}
                className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl shadow-sm "
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button className="w-full px-4 py-2 tracking-wide text-white bg-primary rounded-3xl">
              Sign up
            </button>
          </div>
        </form>
        <div className="mt-4 text-black">
          Already have an account?{" "}
          <span className="float-right">
            <a className="text-primary hover:underline" href="/login">
              Sign in
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
