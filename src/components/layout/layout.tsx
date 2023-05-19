import classNames from 'classnames';
import styles from './layout.module.scss';
import { Nav } from '../layout/nav/nav';
import { Footer } from '../layout/footer/footer';   

export interface LayoutProps {
    className?: string;
    children: React.ReactNode;
}

export const Layout = ({ className, children }: LayoutProps) => {
    return (
        <>
            <Nav />
            <main className={classNames('flex flex-col flex-1', className)}>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;