import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListSectionButton.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

ListSectionButton.propTypes = {
    href: PropTypes.string,
    label: PropTypes.string,
    imageName: PropTypes.any,
};

ListSectionButton.defaultProps = {};

function ListSectionButton(props) {
    const { href, label, imageName } = props;

    return (
        <Link className={cx('btn-wrapper')} underline='none' to={href}>
            <img src={imageName} alt='' height={40} style={{ marginRight: 16 }} />
            <span style={{ fontSize: 18 }}>{label}</span>
        </Link>
    );
}

export default ListSectionButton;
