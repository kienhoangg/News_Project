import React from 'react';
import PropTypes from 'prop-types';
import styles from './Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

Admin.propTypes = {};

Admin.defaultProps = {};

function Admin(props) {
    return <div className={cx('wrapper')}></div>;
}

export default Admin;
