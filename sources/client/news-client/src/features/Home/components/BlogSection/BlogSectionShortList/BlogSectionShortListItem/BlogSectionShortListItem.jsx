import classNames from 'classnames/bind';
import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PropTypes from 'prop-types';
import styles from './BlogSectionShortListItem.module.scss';
import { Link } from '@material-ui/core';
const cx = classNames.bind(styles);

BlogSectionShortListItem.propTypes = {
    className: PropTypes.string,
};

BlogSectionShortListItem.defaultProps = {
    className: '',
};

function BlogSectionShortListItem(props) {
    const { className } = props;

    const data = {
        href: '/blog/abc',
        label: 'Thúc đẩy chuyển đổi số phục vụ cho học tập suốt đời sau đại dịch COVID-19',
    };

    return (
        <Link className={cx('wrapper') + ` ${className}`} underline='none' href={data.href} color='inherit'>
            <FiberManualRecordIcon fontSize='small' />
            <div className={cx('content')}>{data.label}</div>
        </Link>
    );
}

export default BlogSectionShortListItem;
