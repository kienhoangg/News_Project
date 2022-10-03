import classNames from 'classnames/bind';
import stringHelper from 'helpers/stringHelper';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './ListSectionNews.module.scss';

const cx = classNames.bind(styles);

ListSectionNews.propTypes = {
    title: PropTypes.string,
    href: PropTypes.string,
    avatar: PropTypes.string,
};

ListSectionNews.defaultProps = {};

function ListSectionNews(props) {
    const { title, href, avatar } = props;

    return (
        <Link className={cx('wrapper')} to={href}>
            {stringHelper.isNullOrEmpty(avatar) && <img src={avatar} alt='img' />}
            <div className={cx('title-text')}>
                {title} <span className={cx('new-item')}>Mới</span>
            </div>
        </Link>
    );
}

export default ListSectionNews;
