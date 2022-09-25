import classNames from 'classnames/bind';
import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import styles from './BlogSectionShortListItem.module.scss';
import { Link } from '@material-ui/core';
const cx = classNames.bind(styles);

BlogSectionShortListItem.propTypes = {
    className: '',
};

function BlogSectionShortListItem(props) {
    const { className } = props;

    const data = {
        href: '/',
        label: 'Thúc đẩy chuyển đổi số phục vụ cho học tập suốt đời sau đại dịch COVID-19',
    };

    return (
        <Link className={cx('wrapper') + ` ${className}`} underline='none' href={data.href} color=''>
            <FiberManualRecordIcon fontSize='small' />
            <div className={cx('content')}>{data.label}</div>
        </Link>
    );
}

export default BlogSectionShortListItem;
