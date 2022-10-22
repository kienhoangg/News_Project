import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConnectionSection.module.scss';
import classNames from 'classnames/bind';
import Images from 'common/images';
import imageHelper from 'helpers/imageHelper';
import Marquee from 'react-easy-marquee';

const cx = classNames.bind(styles);

ConnectionSection.propTypes = {};

ConnectionSection.defaultProps = {};

const fakeConnectionWebsite = [
    {
        Id: 1,
        ImageUrl: '/content/images/connect1.png',
        Title: 'Trường đào tạo đại học',
    },
    {
        Id: 2,
        ImageUrl: '/content/images/connect2.png',
        Title: 'Trường đào tạo đại học',
    },
    {
        Id: 3,
        ImageUrl: '/content/images/connect3.png',
        Title: 'Trường đào tạo đại học',
    },
    {
        Id: 4,
        ImageUrl: '/content/images/connect4.png',
        Title: 'Trường đào tạo đại học',
    },
];

const fakeConnectionConcern = [
    {
        Id: 1,
        ImageUrl: '/content/images/connect5.png',
        Title: 'Trường đào tạo đại học',
    },
];

function ConnectionSection(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-connection')}>
                <div className={cx('connection-site')}>
                    <div className={cx('connection-title')}>
                        <div className={cx('connection-lable')}>Liên kết Website</div>
                        <div className={cx('connection-divider')}></div>
                    </div>
                    <div className={cx('connection-list')}>
                        {Array.isArray(fakeConnectionWebsite) && (
                            <Marquee duration={20000} background='' height='130px' width='100%' axis='X' align='center' pauseOnHover={true} reverse={true}>
                                {fakeConnectionWebsite.map((item) => {
                                    return <img src={imageHelper.getLinkImageUrl(item.ImageUrl)} alt={item.Title} style={{ margin: '0 10px' }} />;
                                })}
                            </Marquee>
                        )}
                    </div>
                </div>
            </div>
            <div className={cx('section-connection')}>
                <div className={cx('connection-site')}>
                    <div className={cx('connection-title')}>
                        <div className={cx('connection-lable')}>Doanh nghiệp</div>
                        <div className={cx('connection-divider')}></div>
                    </div>
                    <div className={cx('connection-list')}>
                        <Marquee duration={20000} background='' height='130px' width='100%' axis='X' align='center' pauseOnHover={true} reverse={true}>
                            {fakeConnectionConcern.map((item) => {
                                return <img src={imageHelper.getLinkImageUrl(item.ImageUrl)} alt={item.Title} style={{ margin: '0 10px' }} />;
                            })}
                        </Marquee>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectionSection;
