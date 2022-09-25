import './Navbar.scss';
import NavBarButtonItem from './NavBarButtonItem/NavBarButtonItem';

Navbar.propTypes = {};

function Navbar(props) {
    return (
        <div className='news-navbar'>
            <NavBarButtonItem href='/' label={'TRANG CHỦ'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'QLVN ĐIỀU HÀNH'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'THƯ ĐIỆN TỬ'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'DANH BẠ ĐIỆN THOẠI'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'LIÊN HỆ'} />
        </div>
    );
}

export default Navbar;
