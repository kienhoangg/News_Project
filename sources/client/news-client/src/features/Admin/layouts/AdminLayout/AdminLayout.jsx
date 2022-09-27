import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './AdminLayout.module.scss';
import classNames from 'classnames/bind';
import MenuList from '../components/MenuList/MenuList';
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import menuItems from 'features/Admin/menu-items/menuItems';
import { menuOpen, setMenu } from 'features/Admin/adminMenuSlice';

const cx = classNames.bind(styles);

AdminLayout.propTypes = {};

AdminLayout.defaultProps = {};

function AdminLayout({ children }) {
    // const location = useLocation();
    // const adminMenu = useSelector((state) => state.adminMenu);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const getIdMenuOpenByPath = (page) => {
    //         debugger;
    //         for (const menu of menuItems.items) {
    //             for (const menuChildren of menu.children) {
    //                 for (const item of menuChildren.children) {
    //                     if (item.url === location.pathname) {
    //                         return item.id;
    //                     }
    //                 }
    //             }
    //         }
    //         return '';
    //     };

    //     if (adminMenu.isOpen.length === 0) {
    //         let idMenu = getIdMenuOpenByPath(location.pathname);
    //         const actionOpenMenu = menuOpen({ id: idMenu });
    //         dispatch(actionOpenMenu);

    //         const actionSetMenu = setMenu({ opened: true });
    //         dispatch(actionSetMenu);
    //     }
    // }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-menu')}>
                <MenuList />
            </div>
            <div className={cx('right-content')}>{children}</div>
        </div>
    );
}

export default AdminLayout;
