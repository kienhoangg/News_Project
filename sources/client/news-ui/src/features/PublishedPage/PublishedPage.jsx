import React from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

PublishedPage.propTypes = {};

PublishedPage.defaultProps = {};

function PublishedPage(props) {
    return <div className={cx('wrapper')}>PublishedPage</div>;
}

export default PublishedPage;
