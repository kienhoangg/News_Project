import React from 'react';
import PropTypes from 'prop-types';
import styles from './ConnectionSection.module.scss';
import classNames from 'classnames/bind';
import Images from 'common/images';

const cx = classNames.bind(styles);

ConnectionSection.propTypes = {};

ConnectionSection.defaultProps = {};

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
                        <img style={{ width: 'calc(100% / 5)' }} src={Images.CONNECT1} alt='' />
                        <img style={{ width: 'calc(100% / 5)' }} src={Images.CONNECT2} alt='' />
                        <img style={{ width: 'calc(100% / 5)' }} src={Images.CONNECT3} alt='' />
                        <img style={{ width: 'calc(100% / 5)' }} src={Images.CONNECT4} alt='' />
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
                        <img src={Images.CONNECT5} alt='' style={{ width: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConnectionSection;
