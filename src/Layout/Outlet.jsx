import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/Main/Navbar'
import { Footer } from '../../components/Main/Footer';

const Layout = () => {
    return (
        <>
        <NavBar />
        <Outlet />
        <Footer />
        </>
    );
}

export default Layout;