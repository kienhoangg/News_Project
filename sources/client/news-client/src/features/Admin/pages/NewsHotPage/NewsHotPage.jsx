import React from 'react';
import PropTypes from 'prop-types';
import styles from './NewsHotPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsHotPage.propTypes = {};

NewsHotPage.defaultProps = {};

function NewsHotPage(props) {
    return <div className={cx('wrapper')}>NewsHotPage</div>;
}

export default NewsHotPage;
