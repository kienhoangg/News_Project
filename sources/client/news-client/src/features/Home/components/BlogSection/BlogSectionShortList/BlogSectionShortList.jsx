import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogSectionShortList.module.scss';
import classNames from 'classnames/bind';
import BlogSectionShortListItem from './BlogSectionShortListItem/BlogSectionShortListItem';

const cx = classNames.bind(styles);

BlogSectionShortList.propTypes = {};

function BlogSectionShortList(props) {
    return (
        <div className={cx('wrapper')}>
            <BlogSectionShortListItem className={'item'} />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
            <BlogSectionShortListItem />
        </div>
    );
}

export default BlogSectionShortList;
