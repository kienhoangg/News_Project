import classNames from 'classnames/bind';
import commonRender from 'common/commonRender';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './BlogSectionShortListItem.module.scss';
const cx = classNames.bind(styles);

BlogSectionShortListItem.propTypes = {
    className: PropTypes.string,
    data: PropTypes.object,
};

BlogSectionShortListItem.defaultProps = {
    className: '',
    data: undefined,
};

function BlogSectionShortListItem(props) {
    const { className, data } = props;
    const { id, title, avatar, avatarTitle, description } = data;

    // const data = {
    //     href: '/document/123456789',
    //     label: 'Thúc đẩy chuyển đổi số phục vụ cho học tập suốt đời sau đại dịch COVID-19',
    // };

    return (
        <Link className={cx('wrapper') + ` ${className}`} underline='none' to={commonRender.renderLinkNewsDetail(id)} color='inherit'>
            <div className={cx('news-hot-icon')}></div>
            <div className={cx('content')}>{title}</div>
        </Link>
    );
}

export default BlogSectionShortListItem;
