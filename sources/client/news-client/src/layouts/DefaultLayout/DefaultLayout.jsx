import React from 'react';
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Banner from 'layouts/components/Banner/Banner';
import Navbar from 'layouts/components/Navbar/Navbar';

const cx = classNames.bind(styles);

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

DefaultLayout.defaultProps = {};

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Banner />
                <Navbar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
