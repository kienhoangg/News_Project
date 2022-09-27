import React from 'react';
import PropTypes from 'prop-types';
import styles from './NewsListPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsListPage.propTypes = {};

NewsListPage.defaultProps = {};

function NewsListPage(props) {
    return <div className={cx('wrapper')}>NewsListPage</div>;
}

export default NewsListPage;
