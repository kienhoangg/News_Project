import commonRender from 'common/commonRender';
import Images from 'common/images';
import routes from 'config/configRoutes';
import './Navbar.scss';
import NavBarButtonItem from './NavBarButtonItem/NavBarButtonItem';

Navbar.propTypes = {};

function Navbar(props) {
    return (
        <div className='news-navbar'>
            <NavBarButtonItem href='/' label={'TRANG CHỦ'} imageName={Images.EMBELEM_VIETNAM} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href={commonRender.renderMenuPage(1)} label={'QLVN ĐIỀU HÀNH'} />
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
