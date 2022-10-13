import classNames from 'classnames/bind';
import routes from 'config/configRoutes';
import { Link } from 'react-router-dom';
import styles from './BlogSectionListNews.module.scss';
import BlogSectionListNewsItem from './BlogSectionListNewsItem/BlogSectionListNewsItem';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

BlogSectionListNews.propTypes = {
    DocumentHots: PropTypes.array,
};

BlogSectionListNews.defaultProps = {};

function BlogSectionListNews(props) {
    console.log('BlogSectionListNews', props);
    const { DocumentHots } = props;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <Link to={routes.publishedDocumentList}>
                    <h3 style={{ margin: 0 }}>VĂN BẢN CHỈ ĐẠO ĐIỀU HÀNH</h3>
                </Link>
            </div>
            <div className={cx('items')}>
                {Array.isArray(DocumentHots) &&
                    DocumentHots.map((item, index) => {
                        return (
                            <>
                                <BlogSectionListNewsItem DocumentData={item} key={index} />
                            </>
                        );
                    })}
            </div>
        </div>
    );
}

export default BlogSectionListNews;
