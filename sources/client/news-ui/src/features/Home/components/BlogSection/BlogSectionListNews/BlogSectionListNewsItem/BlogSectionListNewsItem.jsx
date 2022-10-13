import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './BlogSectionListNewsItem.module.scss';
import PropTypes from 'prop-types';
import commonRender from 'common/commonRender';

const cx = classNames.bind(styles);

BlogSectionListNewsItem.propTypes = {
    DocumentData: PropTypes.object,
};

BlogSectionListNewsItem.defaultProps = {};

function BlogSectionListNewsItem(props) {
    const { DocumentData } = props;
    const { Id, Code, Name } = DocumentData;
    console.log('BlogSectionListNewsItem', props);

    return (
        <Link className={cx('wrapper')} underline='none' to={commonRender.renderLinkNewsDetail(Id)} color='inherit'>
            {/* <FiberManualRecordIcon fontSize='small' /> */}
            <div className={cx('content')}>
                <div className={cx('icon')}></div> {Name} <span className={cx('badge-new')}>new</span>
            </div>
        </Link>
    );
}

export default BlogSectionListNewsItem;
