import classNames from 'classnames';
import styles from './footer.module.scss';

export interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => {
  return (
    <div className={classNames(styles.root, className)}>
      <footer>
        <div className="flex flex-col items-center justify-between px-20 py-4 md:flex-row">
          <ul className="flex items-center justify-between px-20 py-4">
            <li>
              <span>Compartir en:</span>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-gray-800 hover:opacity-75"
              >
                <span className="ml-2">F</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-gray-800 hover:opacity-75"
              >
                <span className="ml-2">T</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-xs font-bold uppercase leading-snug text-gray-800 hover:opacity-75"
              >
                <span className="ml-2">I</span>
              </a>
            </li>
          </ul>
          <div className="flex items-center justify-between px-1 py-4">
            <div>
              <span className="text-xl text-gray-900 hover:text-gray-700 dark:text-gray-900 dark:hover:text-gray-500 lg:text-sm">
                © GIFOS 2020 All Rights Reserved.
              </span>
            </div>
          </div>
        </div>
        <div className="col-start-1 col-end-6 row-start-1 row-end-2 h-1 w-full bg-indigo-600 dark:bg-black"></div>
      </footer>
    </div>
  );
};
