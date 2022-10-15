import homeApi from 'apis/published/homeApi';
import classNames from 'classnames/bind';
import FooterSection from 'features/Home/components/FooterSection/FooterSection';
import Banner from 'layouts/components/Banner/Banner';
import Navbar from 'layouts/components/Navbar/Navbar';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import styles from './DefaultLayout.module.scss';
// import { addView } from 'features/Home/homeSlice';

const cx = classNames.bind(styles);

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

DefaultLayout.defaultProps = {};

function DefaultLayout({ children }) {
    const [layoutData, setLayoutData] = useState();

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = {};
                const response = await homeApi.getLayoutData(params);
                setLayoutData(response);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchHome();
    }, []);

    // const viewCount = useSelector((state) => {
    //     return state.home.view;
    // });

    useEffect(() => {
        // const actionAddView = addView(1);
        // dispatch(actionAddView);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* <div>Lượt view: {viewCount}</div> */}
                <Banner />
                <Navbar menuDatas={layoutData?.Menu} />
                <div className={cx('content')}>{children}</div>
                <FooterSection />
            </div>
        </div>
    );
}

export default DefaultLayout;
