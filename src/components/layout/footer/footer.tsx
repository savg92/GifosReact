// import classNames from 'classnames';
// import styles from './footer.module.scss';
// import Twitter from '../..//..//assets/Twitter';
import icontwitter from '../../../assets/icon-twitter.svg';
import facebook from '../../../assets//icon_facebook.svg';
import instagram from '../../../assets//icon_instagram.svg';

export const Footer : React.FC = () : JSX.Element => {
  return (
    <>
      <footer className="dark:bg-gray-800">
        <div className="flex flex-col items-center justify-between px-20 py-4 md:flex-row">
          <div className="flex flex-col md:flex-row items-center justify-between pl-4 dark:text-gray-200 md:pl-20">
            <div>
              <p className="">Compartir en:</p>
            </div>
            <ul className="flex  items-center justify-between dark:text-gray-200">
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-gray-800 hover:opacity-75 dark:text-gray-200"
                >
                  {/* <span className="ml-2">F</span> */}
                  <img src={facebook} alt="facebook" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-gray-800 hover:opacity-75 dark:text-gray-200"
                >
                  {/* <span className="ml-2">T</span> */}
                  <img src={icontwitter} alt="twitter" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-gray-800 hover:opacity-75 dark:text-gray-200"
                >
                  {/* <span className="ml-2">I</span> */}
                  <img src={instagram} alt="instagram" />
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-between px-1 py-4">
            <div className=" w-60">
              <span className="text-sm  text-gray-900 hover:text-gray-700 dark:text-gray-200 lg:text-sm ">
                © GIFOS 2020 All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-6 row-start-1 row-end-2 h-1 w-full bg-indigo-600 dark:bg-black"></div>
      </footer>
    </>
  );
};
