import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Col, Input, Row, Skeleton } from 'antd';
import routes from 'config/configRoutes';
import { useSelector } from 'react-redux';
import Marquee from 'react-easy-marquee';
import commonRender from 'common/commonRender';

const { Search } = Input;
const cx = classNames.bind(styles);

SearchBar.propTypes = {};

SearchBar.defaultProps = {};

function SearchBar(props) {
    const homeRedux = useSelector((state) => state.home);

    return (
        <div className={cx('wrapper')}>
            <Row gutter={8} style={{ width: '100%' }}>
                <Col className={cx('col')} span={13}>
                    <Row align='middle'>
                        <Search
                            placeholder='Nhập từ khóa tìm kiếm'
                            size='large'
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </Row>
                </Col>
                <Col span={7}>
                    <div className={cx('btn-group')}>
                        <Link className={cx('btn-item')} to={routes.publishedIntroduce}>
                            Giới thiệu chung
                        </Link>
                        <Link className={cx('btn-item')} to={'/'}>
                            Bộ máy nhà nước
                        </Link>
                        <Link className={cx('btn-item')} to={'/'}>
                            Sơ đồ Website
                        </Link>
                    </div>
                </Col>
                <Col span={4}>
                    <div className={cx('weather')}>
                        <div className={cx('weather-label')}>Yên bái</div>
                        <div className={cx('weather-value')}>27.3 - 29.3</div>
                    </div>
                </Col>
            </Row>
            <Row gutter={8}>
                <div className={cx('news-hot')}>
                    {homeRedux.loading ? (
                        <>
                            <Skeleton.Input active size='small' />
                        </>
                    ) : (
                        <>
                            {Array.isArray(homeRedux?.runPost) && (
                                <Marquee duration={homeRedux.runPost.length * 8000} height='80px' width='100%' axis='X' align='center' pauseOnHover={true} reverse={true}>
                                    {homeRedux.runPost.map((item, index) => {
                                        return (
                                            <>
                                                <Link to={commonRender.renderLinkNewsDetail(item.Id)} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                                    <span className={cx('news-hot-icon')}></span>
                                                    <span key={index} className={cx('news-hot-content')}>
                                                        {item.Title}
                                                    </span>
                                                </Link>
                                            </>
                                        );
                                    })}
                                </Marquee>
                            )}
                        </>
                    )}
                </div>
                <div className={cx('divider')}></div>
            </Row>
        </div>
    );
}

export default SearchBar;
