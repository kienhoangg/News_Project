import React from 'react';
import PropTypes from 'prop-types';
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

Banner.propTypes = {};

function Banner(props) {
    return <div className={cx('news-banner')}></div>;
}

export default Banner;
