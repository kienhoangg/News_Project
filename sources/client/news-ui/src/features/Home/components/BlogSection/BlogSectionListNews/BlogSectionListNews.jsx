import classNames from 'classnames/bind';
import styles from './BlogSectionListNews.module.scss';
import BlogSectionListNewsItem from './BlogSectionListNewsItem/BlogSectionListNewsItem';

const cx = classNames.bind(styles);

BlogSectionListNews.propTypes = {};

BlogSectionListNews.defaultProps = {};

function BlogSectionListNews(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h3 style={{ margin: 0 }}>VĂN BẢN CHỈ ĐẠO ĐIỀU HÀNH</h3>
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
