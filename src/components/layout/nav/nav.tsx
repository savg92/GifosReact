import classNames from 'classnames';
import styles from './nav.module.scss';
import { useEffect } from 'react';
import { useState } from 'react';
// import logo from '../../assets/logo-desktop.svg';
import 'tailwindcss/tailwind.css';
import { useLocation } from 'react-router-dom';

export interface NavProps {
  className?: string;
}

export const Nav : React.FC<NavProps> = ({ className, }: NavProps) : JSX.Element => {
  const pathName : string = useLocation().pathname;

  const [nav, setNav] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const showNav: React.MouseEventHandler<HTMLButtonElement> = () : void => {
    setNav(!nav);
  };

  useEffect(() => {
    const isDarkMode = localStorage.getItem('DarkMode') === 'true';
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('DarkMode', String(isDarkMode));
  }, []);

  const handleToggle: React.ChangeEventHandler<HTMLInputElement> = () : void => {
    const isDarkMode = localStorage.getItem('DarkMode') === 'true';
    const newIsDarkMode = !isDarkMode;
    setDarkMode(newIsDarkMode);
    localStorage.setItem('DarkMode', String(newIsDarkMode));
    document.documentElement.classList.toggle('dark', newIsDarkMode);
  };

  return (
    <>
      <header className="fixed z-10 w-full bg-white dark:bg-gray-800">
        <div className="col-start-1 col-end-6 row-start-1 row-end-2 h-1 w-full bg-indigo-600 dark:bg-black"></div>
        <div className="flex items-center justify-between px-20 py-2">
          <div className="flex items-center justify-between px-1 py-2">
            <div>
              <a
                href="/"
                className="text-xl font-bold text-violet-700 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-2xl"
              >
                GIFOS
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
              </button>
            </div>
          </div>
          <nav className="hidden md:flex">
            <ul className="none items-center justify-between space-x-12 px-4 py-4 lg:flex ">
              <li>
                <label
                  htmlFor="dark-mode-toggle"
                  className="cursor-pointer font-bold text-violet-700 hover:underline hover:decoration-green-400 dark:text-gray-200"
                >
                  {darkMode ? 'MODO DIURNO' : 'MODO NOCTURNO'}
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
                <a
                  href="/favorites"
                  className={`font-bold  hover:underline hover:decoration-green-400  ${
                    pathName === '/favorites'
                      ? 'text-gray-400'
                      : 'text-violet-700 dark:text-gray-200'
                  } `}
                >
                  FAVORITOS
                </a>
              </li>
              <li>
                <a
                  href="/misgif"
                  className={`font-bold  hover:underline hover:decoration-green-400 ${
                    pathName === '/misgif' ? 'text-gray-400' : 'text-violet-700 dark:text-gray-200'
                  } `}
                >
                  MIS GIFOS
                </a>
              </li>
              <li className="flex h-12 w-10 items-center justify-center align-middle">
                <a
                  href="/newgif"
                  className={`flex h-10 w-12 items-center justify-center rounded-full border-2 border-solid text-center ${
                    pathName === '/newgif'
                      ? 'border-gray-400 bg-slate-400 text-2xl text-white '
                      : 'border-violet-700 text-violet-700 hover:bg-violet-700 hover:text-white dark:border-gray-200 dark:text-gray-200 dark:hover:bg-white dark:hover:text-gray-800'
                  } `}
                >
                  +
                </a>
              </li>
            </ul>
          </nav>
          {/* hamburger */}
          {nav ? (
            // close button
            <i
              // className="fa fa-times fixed right-[30px] z-50  md:hidden"
              className="md:hidden"
              aria-hidden="true"
              onClick={showNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 font-bold text-violet-700 dark:text-gray-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </i>
          ) : (
            <i className="md:hidden" aria-hidden="true" onClick={showNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 font-bold text-violet-700 dark:text-gray-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </i>
          )}

          {/* mobile nav */}
          <nav
            className={`fixed top-[0px] z-40 mt-20 flex h-[100vh] w-full flex-col items-center justify-around bg-indigo-600 duration-1000 dark:bg-gray-800 md:hidden ${
              nav ? 'right-[0px]' : 'right-[-100vw]'
            } `}
          >
            <ul className="none items-center justify-center align-middle ">
              <li>
                <label htmlFor="dark-mode-toggle" className="cursor-pointer dark:text-gray-200">
                  {/* {localStorage.getItem('DarkMode') === 'true' ? 'MODO DIURNO' : 'MODO NOCTURNO'} */}
                  {darkMode ? 'MODO DIURNO' : 'MODO NOCTURNO'}
                </label>
                <input
                  type="checkbox"
                  id="dark-mode-toggle-2"
                  onChange={handleToggle}
                  checked={localStorage.getItem('DarkMode') === 'true'}
                  className="invisible"
                />
              </li>
              <li className="text-center">
                <a href="/favorites" className="text-gray-800 dark:text-gray-200">
                  FAVORITOS
                </a>
              </li>
              <li className="text-center">
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