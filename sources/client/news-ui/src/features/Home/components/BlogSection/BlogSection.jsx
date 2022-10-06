import classNames from 'classnames/bind';
import BlogSectionListNews from './BlogSectionListNews/BlogSectionListNews';
import BlogSectionShortList from './BlogSectionShortList/BlogSectionShortList';
import BlogSectionShortNews from './BlogSectionShortNews/BlogSectionShortNews';
import PropTypes from 'prop-types';

import styles from './BlogSection.module.scss';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

BlogSection.propTypes = {
    newsHots: PropTypes.array,
};

function BlogSection(props) {
    const { newsHots } = props;
    console.log('BlogSection', props);
    const firstHot = Array.isArray(newsHots) ? newsHots[0] : undefined;

    return (
        <div className={cx('wrapper')}>
            <Row className='h-100'>
                <Col span={18} className={cx('left')}>
                    <Row className={cx('left-preview')}>
                        <Col span={16} className={cx('preview-content')}>
                            {firstHot && <BlogSectionShortNews data={firstHot} />}
                        </Col>
                        <Col span={8} className={cx('preview-news')}>
                            <BlogSectionShortList listData={newsHots} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Link className={cx('btn-view')} to='/'>
                                <span>Xem thêm</span>
                            </Link>
                        </Col>
                    </Row>
                </Col>
                <Col span={6} className={cx('blog-right') + ' h-100'}>
                    <div className={cx('container')}>
                        <div className={cx('list-news')}>
                            <BlogSectionListNews />
                        </div>
                        <div className={cx('map')}>
                            <img src='https://yenbai.gov.vn/noidung/lienket/PublishingImages/QuangCaoDoc/bandoyb.gif' alt='' height={'100%'} width='100%' />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default BlogSection;
