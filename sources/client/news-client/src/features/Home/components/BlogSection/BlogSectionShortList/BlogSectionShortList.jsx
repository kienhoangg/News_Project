import classNames from 'classnames/bind';
import styles from './BlogSectionShortList.module.scss';
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
