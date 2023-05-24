import classNames from 'classnames';
import styles from './nav.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
// import logo from '../../assets/logo-desktop.svg';
import 'tailwindcss/tailwind.css';

export interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
  const [nav, setNav] = useState(false);

  const showNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('DarkMode') === 'true';
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('DarkMode', String(isDarkMode));
  }, []);

  const handleToggle = () => {
    const isDarkMode = localStorage.getItem('DarkMode') === 'true';
    const newIsDarkMode = !isDarkMode;
    localStorage.setItem('DarkMode', String(newIsDarkMode));
    document.documentElement.classList.toggle('dark', newIsDarkMode);
  };

  return (
    <>
      <header className="bg-white fixed z-10 w-full dark:bg-gray-800">
        <div className="col-start-1 col-end-6 row-start-1 row-end-2 h-1 w-full bg-indigo-600 dark:bg-black"></div>
        <div className="flex items-center justify-between px-20 py-4">
          <div className="flex items-center justify-between px-1 py-4">
            <div>
              <a
                href="/"
                className="text-xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-2xl"
              >
                LOGO
              </a>
            </div>
            <div className="-mx-2 flex items-center justify-between px-4 py-4">
              <button className="mx-2 flex text-gray-800 focus:outline-none dark:text-gray-200 ">
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M20 10a10 10 0 11-20 0 10 10 0 0120 0zm-9.293 1.707a1 1 0 001.414 0L15 9.414V11a1 1 0 102 0V8a1 1 0 00-1-1h-3a1 1 0 000 2h1.586l-2.293 2.293a1 1 0 000 1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {/* <img src={logo} alt="logo" /> */}
              </button>
            </div>
          </div>
          <nav className="hidden md:flex">
            <ul className="none items-center justify-between space-x-12 px-4 py-4 lg:flex ">
              <li>
                <label htmlFor="dark-mode-toggle" className="cursor-pointer dark:text-gray-200">
                  {localStorage.getItem('DarkMode') === 'true' ? 'MODO DIURNO' : 'MODO NOCTURNO'}
                </label>
                <input
                  type="checkbox"
                  id="dark-mode-toggle"
                  onChange={handleToggle}
                  checked={localStorage.getItem('DarkMode') === 'true'}
                  className="invisible"
                />
              </li>
              <li>
                <a href="/favorites" className="text-gray-800 dark:text-gray-200">
                  FAVORITOS
                </a>
              </li>
              <li>
                <a href="/misgif" className="text-gray-800 dark:text-gray-200">
                  MIS GIFOS
                </a>
              </li>
              <li>
                <a href="/newgif" className="text-gray-800 dark:text-gray-200">
                  +
                </a>
              </li>
            </ul>
          </nav>
          {/* hamburger */}
          {nav ? (
            // close button
            <i
              className="fa fa-times fixed right-[30px] z-50 text-3xl md:hidden"
              aria-hidden="true"
              onClick={showNav}
            >
              X
            </i>
          ) : (
            <i className="fa fa-bars text-3xl md:hidden" aria-hidden="true" onClick={showNav}>
              |||
            </i>
          )}

          {/* mobile nav */}
          <nav
            className={`fixed top-[0px] z-40 flex h-[100vh] w-full flex-col items-center justify-around bg-indigo-600 duration-1000 dark:bg-gray-800 md:hidden mt-28 ${
              nav ? 'right-[0px]' : 'right-[-100vw]'
            } `}
          >
            <ul className="none items-center justify-between space-x-12 px-4 py-4 lg:flex ">
              <li>
                <label htmlFor="dark-mode-toggle" className="cursor-pointer dark:text-gray-200">
                  {localStorage.getItem('DarkMode') === 'true' ? 'MODO DIURNO' : 'MODO NOCTURNO'}
                </label>
                <input
                  type="checkbox"
                  id="dark-mode-toggle"
                  onChange={handleToggle}
                  checked={localStorage.getItem('DarkMode') === 'true'}
                  className="invisible"
                />
              </li>
              <li>
                <a href="/favorites" className="text-gray-800 dark:text-gray-200">
                  FAVORITOS
                </a>
              </li>
              <li>
                <a href="/misgif" className="text-gray-800 dark:text-gray-200">
                  MIS GIFOS
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

// ```jsx
// import React from "react";
// import "tailwindcss/tailwind.css";

// const Button = () => {
//   return (
//     <button className="relative bg-transparent border-none">
//       <span className="absolute bg-black h-2 w-20 top-10 left-0"></span>
//       <span className="absolute bg-black h-2 w-20 top-17 left-0"></span>
//       <span className="absolute bg-black h-2 w-20 top-24 left-0"></span>
//       <span className="absolute text-white text-base top-15 left-26">
//         Option 1
//       </span>
//       <span className="absolute text-white text-base top-25 left-26">
//         Option 2
//       </span>
//       <span className="absolute text-white text-base top-35 left-26">
//         Option 3
//       </span>
//     </button>
//   );
// };

// export default Button;
// ```;
