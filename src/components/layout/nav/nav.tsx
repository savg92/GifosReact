import classNames from 'classnames';
import styles from './nav.module.scss';
import { useEffect } from 'react';
// import logo from '../../assets/logo-desktop.svg';

export interface NavProps {
  className?: string;
}

export const Nav = ({ className }: NavProps) => {
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
    <nav className="bg-white dark:bg-black">
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
        <ul className="flex items-center justify-between px-4 py-4 space-x-12 lg:flex">
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
              MIS GIF
            </a>
          </li>
          <li>
            <a href="/newgif" className="text-gray-800 dark:text-gray-200">
              +
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
