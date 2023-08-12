import classNames from 'classnames';
import styles from './layout.module.scss';
import { Nav } from '../layout/nav/nav';
import { Footer } from '../layout/footer/footer';   

export interface LayoutProps {
    className?: string;
    children: React.ReactNode;
}

export const Layout : React.FC<LayoutProps>= ({ className, children }: LayoutProps) : JSX.Element => {
    return (
      <>
        <Nav className="dark:bg-gray-900" />
        <main className={classNames('flex flex-1 flex-col pt-20 dark:bg-gray-800', className)}>
          {children}
        </main>
        <Footer />
      </>
    );
};

export default Layout;