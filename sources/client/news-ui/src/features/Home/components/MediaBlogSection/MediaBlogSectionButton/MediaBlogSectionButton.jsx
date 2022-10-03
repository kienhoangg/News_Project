import React from 'react';
import PropTypes from 'prop-types';
import styles from './MediaBlogSectionButton.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

MediaBlogSectionButton.propTypes = {
    href: PropTypes.string,
    label: PropTypes.string,
    imageName: PropTypes.any,
    size: PropTypes.string,
};

MediaBlogSectionButton.defaultProps = {};

function MediaBlogSectionButton(props) {
    const { href, label, imageName, size } = props;

    let sizeImage = 24;
    let marginImage = 8;
    let fontSize = '21px';
    switch (size) {
        case 'small':
            sizeImage = 16;
            marginImage = 6;
            fontSize = '16px';
            break;
        default:
            break;
    }

    return (
        <Link className={cx('btn-wrapper')} underline='none' to={href}>
            <img src={imageName} alt='' height={sizeImage} style={{ marginRight: marginImage }} />
            <span style={{ fontSize: fontSize }}>{label}</span>
        </Link>
    );
}

export default MediaBlogSectionButton;
