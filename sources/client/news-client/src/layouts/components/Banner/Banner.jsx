import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

Banner.propTypes = {};

function Banner(props) {
    return <div className={cx('news-banner')}></div>;
}

export default Banner;
