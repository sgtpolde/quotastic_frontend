import React from "react";

const Footer = () => {
  return (
    <footer className="mb-auto p-2 bg-primary shadow md:px-6 md:py-8 z-[-2]">
      <div className="ml-10 sm:flex sm:items-center sm:justify-between ">
        <img src={"logoIcon"} className="h-6 w-8 mr-3" alt="Logo" />
        <ul className="flex flex-wrap items-center mb-6 text-sm text-white sm:mb-0 dark:text-whie">
          <li>
            <a href="/" className="mr-4 hover:underline md:mr-6 ">
              All Rights Reserved | Skillupmentor.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
