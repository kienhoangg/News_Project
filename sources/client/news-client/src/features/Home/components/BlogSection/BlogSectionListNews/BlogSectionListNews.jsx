import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogSectionListNews.module.scss';
import classNames from 'classnames/bind';
import BlogSectionListNewsItem from './BlogSectionListNewsItem/BlogSectionListNewsItem';

const cx = classNames.bind(styles);

BlogSectionListNews.propTypes = {};

BlogSectionListNews.defaultProps = {};

function BlogSectionListNews(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h3>VĂN BẢN CHỈ ĐẠO ĐIỀU HÀNH</h3>
            </div>
            <div className={cx('items')}>
                <BlogSectionListNewsItem />
                <BlogSectionListNewsItem />
                <BlogSectionListNewsItem />
                <BlogSectionListNewsItem />
                <BlogSectionListNewsItem />
                <BlogSectionListNewsItem />
                <BlogSectionListNewsItem />
            </div>
        </div>
    );
}

export default BlogSectionListNews;
