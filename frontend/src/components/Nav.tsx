import { useState } from "react";
import api from "../api/api";
import QuoteCreate from "./popup/QuoteCreate";
import { useUser } from "../stores/userContext";
import ProfileSettings from "./popup/ProfileSettings";
import logo from "../assets/quotasticLogo.svg";
const Nav = () => {
  //States
  let [open, setOpen] = useState(false);
  const { user, logout } = useUser();
  const [isQuoteCreateVisible, setIsQuoteCreateVisible] = useState(false);
  const [isProfileSettingsVisible, setIsProfileSettingsVisible] =
    useState(false);
  const [errors, setErrors] = useState({});

  //Menu links
  let Links = [
    { name: "Home", link: "/" },
    { name: "Settings" },
    { name: "Logout" },
  ];
  //Menu links logged out
  let LinksOut = [{ name: "Home", link: "/" }];

  //logout function
  const handleLogOut = async () => {
    await logout();
  };

  //toggle User settings
  const toggleProfileSettings = () => {
    setIsProfileSettingsVisible(
      (prevIsProfileSettingsVisible) => !prevIsProfileSettingsVisible
    );
  };

  //togle quote add
  const toggleQuoteCreate = () => {
    setIsQuoteCreateVisible(
      (prevIsQuoteCreateVisible) => !prevIsQuoteCreateVisible
    );
  };

  //handle profile update
  const handleProfileSettingsSubmit = async (
    email: string,
    first_name: string,
    last_name: string
  ) => {
    const res = await api.put(`users/info`, {
      email,
      first_name,
      last_name,
    });
    //window.location.reload();
    console.log(res);
    // Update state to hide modal
    setIsQuoteCreateVisible(false);
  };

  //handle create quote
  const handleQuoteCreateSubmit = async (content: string) => {
    if (content.trim() === "") {
      setErrors({ content: "Please enter a quote" });
      return;
    }
    const res = await api.post("me/myquote", {
      content,
    });
    window.location.reload();
    console.log(res);
    // Update state to hide modal
    setIsQuoteCreateVisible(false);
  };

  const redirect = async () => {
    window.location.href = `/profile`;
  };

  //if user is not logged in show this

  if (!user) {
    return (
      <div className="shadow-md w-full fixed top-0 left-0 ">
        {/*  Navbar*/}
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          {/*  Hamburger icon*/}
          <div className="max-md:flex max-md:flex-wrap">
            <div
              onClick={() => setOpen(!open)}
              className="text-3xl flex w-1/2 items-center cursor-pointer md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                name={open ? "close" : "menu"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {/* Logo button*/}
            <div className="flex max-md:w-1/2 cursor-pointer justify-end ">
              <img
                src={logo}
                onClick={() => {
                  window.location.href = `/`;
                }}
              />
            </div>
          </div>
          {/* mobile menu  + link items*/}
          <div
            className={`md:flex flex-row-reverse md:items-center md:pb-0 pb-12 absolute max-md:shadow-lg md:static bg-white md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-0 opacity-100" : "top-[-490px]"
            } md:opacity-100 `}
          >
            {/* X button*/}
            <div className="my-5">
              <svg
                onClick={() => setOpen(!open)}
                xmlns="http://www.w3.org/2000/svg"
                name={open ? "close" : "menu"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#DE8667"
                className="w-6 h-6 cursor-pointer md:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* Render links to other stuff */}
            <ul className="flex md:items-center md:hidden">
              {LinksOut.map((link) => (
                <li
                  key={link.name}
                  className="md:ml-8 text-xl md:my-0 my-7 md:text-primary"
                >
                  <a href={link.link} className="">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            {/*conditional */}
            <div className="md:flex justify-center content-center gap-8 max-md:mr-12">
              <button className="max-md:w-full whitespace-nowrap px-8 py-2 tracking-wide text-white bg-primary rounded-3xl max-md:mb-5">
                <a href="/register">Sign up</a>
              </button>
              <button className="max-md:w-full px-8 py-2 tracking-wide border border-primary text-primary bg-white rounded-3xl ">
                <a href="/Login">Login</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="shadow-md w-full bg-transparent z-[1]">
        {isQuoteCreateVisible && (
          <QuoteCreate
            onClose={toggleQuoteCreate}
            onSubmit={handleQuoteCreateSubmit}
          />
        )}
        {isProfileSettingsVisible && (
          <ProfileSettings
            onClose={toggleProfileSettings}
            onSubmit={handleProfileSettingsSubmit}
          />
        )}
        {/*  Navbar*/}
        <div className="md:flex items-center justify-between bg-transparent py-4 md:px-10 px-7">
          {/*  Hamburger icon*/}
          <div className="max-md:flex max-md:flex-wrap">
            <div
              onClick={() => setOpen(!open)}
              className="text-3xl flex w-1/3 items-center cursor-pointer md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                name={open ? "close" : "menu"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
            {/* Logo button*/}
            <div className="flex max-md:w-1/3 cursor-pointer justify-center">
              {" "}
              <img
                src={logo}
                onClick={() => {
                  window.location.href = `/`;
                }}
              ></img>
            </div>
            {/* + button* add quote*/}
            <div className="max-md:flex max-md:w-1/3 justify-end hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#DE8667"
                className="w-6 h-6 justify-end cursor-pointer"
                onClick={toggleQuoteCreate}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
          {/* mobile menu  + link items*/}
          <div
            className={`md:flex flex-row-reverse md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[5] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-0 opacity-100" : "top-[-490px]"
            } md:opacity-100 `}
          >
            {/* X button*/}
            <div className="my-5">
              <svg
                onClick={() => setOpen(!open)}
                xmlns="http://www.w3.org/2000/svg"
                name={open ? "close" : "menu"}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#DE8667"
                className="w-6 h-6 cursor-pointer md:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            {/* User picture*/}
            <div className="flex space-between md:mx-4">
              <div onClick={redirect} className="">
                <img
                  className="h-12 w-12 object-cover rounded-full lg:mx-6 cursor-pointer"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                  alt="Current profile"
                />
              </div>
              {/* + button* add quote*/}
              <div className="flex justify-end max-md:hidden mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#DE8667"
                  className="w-6 h-6 justify-end cursor-pointer"
                  onClick={toggleQuoteCreate}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              {/* Name */}
              <div className="md:hidden mt-2 ml-5 text-xl">
                <span>{user.firstName}</span>
              </div>
            </div>
            {/* Render links to other stuff */}
            <ul className="md:flex md:items-center">
              {Links.map((link, index) => (
                <li
                  key={link.name}
                  className="md:ml-8 text-xl md:my-0 my-7 md:text-primary"
                >
                  <a
                    href={link.link}
                    className="cursor-pointer"
                    onClick={
                      index === 2
                        ? handleLogOut
                        : undefined || index === 1
                        ? toggleProfileSettings
                        : undefined
                    }
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Nav;
