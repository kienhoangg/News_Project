import classNames from 'classnames/bind';
import Banner from 'layouts/components/Banner/Banner';
import Navbar from 'layouts/components/Navbar/Navbar';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './DefaultLayout.module.scss';
// import { addView } from 'features/Home/homeSlice';

const cx = classNames.bind(styles);

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

DefaultLayout.defaultProps = {};

function DefaultLayout({ children }) {
    // const dispatch = useDispatch();

    const viewCount = useSelector((state) => {
        return state.home.view;
    });

    useEffect(() => {
        // const actionAddView = addView(1);
        // dispatch(actionAddView);
    });

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div>Lượt view: {viewCount}</div>
                <Banner />
                <Navbar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
