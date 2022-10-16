import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import commonRender from 'common/commonRender';
import Images from 'common/images';
import routes from 'config/configRoutes';
import { useState } from 'react';
import './Navbar.scss';
import NavBarButtonItem from './NavBarButtonItem/NavBarButtonItem';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

Navbar.propTypes = {
    menuDatas: PropTypes.array,
};

function Navbar(props) {
    const navigate = useNavigate();
    const { menuDatas } = props;

    let items = [
        {
            label: 'Trang chủ',
            key: 'mail',
            icon: <img src={Images.EMBELEM_VIETNAM} width={10} alt={''} />,
        },
    ];

    if (menuDatas) {
        items = menuDatas.map((dataLevel1) => {
            var itemDateLevel2 = dataLevel1?.Items?.map((item) => {
                return {
                    label: item.Name,
                    key: item.Id,
                };
            });

            let result = {
                label: dataLevel1.Name,
                key: dataLevel1.Id,
                icon: dataLevel1?.isHome ? <img src={Images.EMBELEM_VIETNAM} width={10} alt={''} /> : '',
            };

            if (Array.isArray(dataLevel1?.Items) && dataLevel1?.Items.length > 0) {
                result.children = itemDateLevel2;
            }
            if (dataLevel1?.IsHome) {
                result.icon = <img src={Images.EMBELEM_VIETNAM} width={10} alt={''} />;
            }
            return result;
        });
    }

    // const [current, setCurrent] = useState('mail');

    // const onClick = (e) => {
    //     console.log('click ', e);
    //     setCurrent(e.key);
    // };

    function handleOnClickMenuItem(params) {
        let select = getMenuItemByKey(params.key);

        if (select) {
            if (select?.IsHome) navigate('/');
            if (select?.Url) navigate(select.Url);
        }
    }

    function getMenuItemByKey(key) {
        for (let index = 0; index < menuDatas.length; index++) {
            const menuItem = menuDatas[index];
            if (menuItem?.Id == key) return menuDatas[index];

            for (let subIndex = 0; subIndex < menuItem?.Items.length; subIndex++) {
                const element = menuItem.Items[subIndex];
                if (element?.Id == key) return element;
            }
        }
        return undefined;
    }

    return (
        <div className='news-navbar'>
            {Array.isArray(menuDatas) && <Menu mode='horizontal' items={items} selectable={false} onClick={handleOnClickMenuItem} />}

            {/* <NavBarButtonItem href='/' label={'TRANG CHỦ'} imageName={Images.EMBELEM_VIETNAM} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href={commonRender.renderMenuPage(1)} label={'QLVN ĐIỀU HÀNH'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'THƯ ĐIỆN TỬ'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'DANH BẠ ĐIỆN THOẠI'} />
            <div className='news-navbar-hr'></div>
            <NavBarButtonItem href='/' label={'LIÊN HỆ'} /> */}
        </div>
    );
}

export default Navbar;
