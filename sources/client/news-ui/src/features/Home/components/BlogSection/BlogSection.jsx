import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import BlogSectionListNews from './BlogSectionListNews/BlogSectionListNews';
import BlogSectionShortList from './BlogSectionShortList/BlogSectionShortList';
import BlogSectionShortNews from './BlogSectionShortNews/BlogSectionShortNews';

import { Col, Row, Skeleton } from 'antd';
import routes from 'config/configRoutes';
import { Link } from 'react-router-dom';
import styles from './BlogSection.module.scss';
const cx = classNames.bind(styles);

BlogSection.propTypes = {
    isLoading: PropTypes.bool,
    newsHots: PropTypes.array,
    documentHots: PropTypes.array,
    onHover: PropTypes.func,
    dataPreview: PropTypes.object,
};

BlogSection.defaultProps = {
    isLoading: true,
};

function BlogSection(props) {
    const { isLoading, newsHots, onHover, dataPreview, documentHots } = props;

    return (
        <div className={cx('wrapper')}>
            <Row className='h-100'>
                <Col md={18} sm={24} className={cx('left')}>
                    <Row className={cx('left-preview')}>
                        <Col md={16} sm={24} className={cx('preview-content')}>
                            <Skeleton loading={isLoading} active>
                                <>{dataPreview && <BlogSectionShortNews data={dataPreview} />}</>
                            </Skeleton>
                        </Col>
                        <Col md={8} sm={24} className={cx('preview-news')}>
                            <Skeleton loading={isLoading} active>
                                <BlogSectionShortList onHover={onHover} listData={newsHots} />
                            </Skeleton>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Link className={cx('btn-view')} to={routes.publishedNewsPostFieldList}>
                                <span>Xem thêm</span>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col md={6} sm={24} xs={24} className={cx('blog-right') + ' h-100'}>
                    <div className={cx('container')}>
                        <div className={cx('list-news')}>
                            <BlogSectionListNews DocumentHots={documentHots} isLoading={isLoading} />
                        </div>
                        <a className={cx('map')} href={'https://yenbai.gov.vn/Pages/ban-do.aspx'}>
                            <img src='https://yenbai.gov.vn/noidung/lienket/PublishingImages/QuangCaoDoc/bandoyb.gif' alt='' height={'100%'} width='100%' />
                        </a>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default BlogSection;
