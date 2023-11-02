import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../stores/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (display error message, etc.)
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 justify-center sm:pt-6 ">
        <div>
          <h1 className="text-4xl text-black text-center">
            Welcome <span className="text-primary">back!</span>
          </h1>
          <h2 className="text-center text-black">
            Thank you for coming back. Hope you have a good day <br></br>and
            inspire others.
          </h2>
        </div>
        <div className="w-full px-6 py-0 mt-6 overflow-hidden bg-white sm:max-w-lg sm:rounded-lg">
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
                  value={email}
                  name="email"
                  className="block w-full px-4 py-0 mt-1 border-2 border-primary rounded-3xl border-solid"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
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
                  value={password}
                  name="password"
                  className="block w-full px-4 py-0 mt-1  border-2 border-primary rounded-3xl shadow-sm "
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <button className="w-full px-4 py-2 tracking-wide text-white bg-primary rounded-3xl">
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-black">
            Already have an account?{" "}
            <span className="float-right">
              <a className="text-primary hover:underline" href="/register">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
