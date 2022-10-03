import classNames from 'classnames/bind';
import styles from './BlogSectionShortList.module.scss';
import BlogSectionShortListItem from './BlogSectionShortListItem/BlogSectionShortListItem';

const cx = classNames.bind(styles);

BlogSectionShortList.propTypes = {};

function BlogSectionShortList(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('divider')}></div>
            <div className={cx('items')}>
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
                <BlogSectionShortListItem />
            </div>
        </div>
    );
}

export default BlogSectionShortList;
