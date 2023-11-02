import React, { useState } from "react";

const ProfileSettings = (props: any) => {
  const [email, setEmail] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Call onSubmit prop with form data
    props.onSubmit(
      email !== "" ? email : "",
      first_name !== "" ? first_name : "",
      last_name !== "" ? last_name : ""
    );
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-[10]">
      <div className="py-2 px-2 flex justify-center ">
        <div className="p-6 max-w-xl max-md:max-w-md max-sm:max-w-xs bg-white shadow-xl rounded-lg border border-gray-200 flex">
          <div className="flex flex-col gap-5">
            <div className="px-3 py-2">
              <div className="font-normal text-black text-3xl flex py-4">
                Profile <p className="text-primary pl-2">settings.</p>
              </div>
              <div className="font-normal text-black text-xl">
                Change your profile settings
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
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
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl border-solid"
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
                        value={first_name}
                        onChange={(e) => setFirst_name(e.target.value)}
                        placeholder="Janez"
                        className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl shadow-sm "
                      />
                      <button
                        type="button"
                        className="rounded-3xl border border-alternative text-white bg-alternative px-8 py-1 mt-4 w-full"
                      >
                        Change password
                      </button>
                    </div>
                  </div>
                  <div className="w-1/2 ml-4 flex flex-col">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 undefined mt-4"
                    >
                      Last name
                    </label>
                    <div className="flex flex-col items-start">
                      <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={(e) => setLast_name(e.target.value)}
                        placeholder="Novak"
                        className="block w-full px-4 py-2 mt-1 border-2 border-primary rounded-3xl shadow-sm"
                      />
                      <button
                        type="button"
                        className="rounded-3xl  text-lg border border-primary text-white bg-primary px-8 py-1 mt-4 w-full"
                      >
                        Change profile picture
                      </button>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="text-xl">
                <span className="flex gap-4 pl-1">
                  <button
                    type="submit"
                    className="rounded-3xl border border-primary text-white bg-primary px-8 py-1 mt-4"
                  >
                    Submit
                  </button>

                  <button
                    onClick={props.onClose}
                    className="rounded-3x  px-8 py-1  mt-4"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
