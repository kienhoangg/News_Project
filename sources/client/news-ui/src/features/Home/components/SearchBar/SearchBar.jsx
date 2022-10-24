import React from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Col, Input, Row } from 'antd';
import routes from 'config/configRoutes';
import { useSelector } from 'react-redux';
import Marquee from 'react-easy-marquee';

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
                                // background: '#ececec',
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
                    {Array.isArray(homeRedux?.runPost) && (
                        <Marquee duration={50000} height='80px' width='100%' axis='X' align='center' pauseOnHover={true} reverse={true}>
                            {homeRedux.runPost.map((item, index) => {
                                return (
                                    <>
                                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                            <span className={cx('news-hot-icon')}></span>
                                            <span key={index} className={cx('news-hot-content')}>
                                                Điểm hoạt động chỉ đạo, điều hành của lãnh đạo UBND tỉnh trong tuần từ 08/8 - 14/8
                                            </span>
                                        </Link>
                                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                            <span className={cx('news-hot-icon')}></span>
                                            <span key={index} className={cx('news-hot-content')}>
                                                Điểm hoạt động chỉ đạo, điều hành của lãnh đạo UBND tỉnh trong tuần từ 08/8 - 14/8
                                            </span>
                                        </Link>
                                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                            <span className={cx('news-hot-icon')}></span>
                                            <span key={index} className={cx('news-hot-content')}>
                                                Điểm hoạt động chỉ đạo, điều hành của lãnh đạo UBND tỉnh trong tuần từ 08/8 - 14/8
                                            </span>
                                        </Link>
                                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                            <span className={cx('news-hot-icon')}></span>
                                            <span key={index} className={cx('news-hot-content')}>
                                                Điểm hoạt động chỉ đạo, điều hành của lãnh đạo UBND tỉnh trong tuần từ 08/8 - 14/8
                                            </span>
                                        </Link>
                                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                            <span className={cx('news-hot-icon')}></span>
                                            <span key={index} className={cx('news-hot-content')}>
                                                Điểm hoạt động chỉ đạo, điều hành của lãnh đạo UBND tỉnh trong tuần từ 08/8 - 14/8
                                            </span>
                                        </Link>
                                        <Link to={'/'} style={{ display: 'flex', alignItems: 'center', marginRight: '100px' }}>
                                            <span className={cx('news-hot-icon')}></span>
                                            <span key={index} className={cx('news-hot-content')}>
                                                Điểm hoạt động chỉ đạo, điều hành của lãnh đạo UBND tỉnh trong tuần từ 08/8 - 14/8
                                            </span>
                                        </Link>
                                    </>
                                );
                            })}
                        </Marquee>
                    )}
                </div>
                <div className={cx('divider')}></div>
            </Row>
        </div>
    );
}

export default SearchBar;
