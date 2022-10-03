import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './BlogSectionListNewsItem.module.scss';

const cx = classNames.bind(styles);

BlogSectionListNewsItem.propTypes = {};

BlogSectionListNewsItem.defaultProps = {};

function BlogSectionListNewsItem(props) {
    const data = {
        href: '/',
        label: 'Thúc đẩy chuyển đổi số phục vụ cho học tập suốt đời sau đại dịch COVID-19',
    };

    return (
        <Link className={cx('wrapper')} underline='none' to={data.href} color='inherit'>
            {/* <FiberManualRecordIcon fontSize='small' /> */}
            <div className={cx('content')}>
                {data.label} <span className={cx('badge-new')}>new</span>
            </div>
        </Link>
    );
}

export default BlogSectionListNewsItem;
