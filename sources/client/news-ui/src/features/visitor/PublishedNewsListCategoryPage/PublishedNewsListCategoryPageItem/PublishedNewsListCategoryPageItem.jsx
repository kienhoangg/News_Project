import React from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedNewsListCategoryPageItem.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import stringHelper from 'helpers/stringHelper';
import datetimeHelper from 'helpers/datetimeHelper';
import { Link } from 'react-router-dom';
import commonRender from 'common/commonRender';

const cx = classNames.bind(styles);

PublishedNewsListCategoryPageItem.propTypes = {
    data: PropTypes.object,
    isFirst: PropTypes.bool,
};

PublishedNewsListCategoryPageItem.defaultProps = {
    data: {},
    isFirst: false,
};

function PublishedNewsListCategoryPageItem(props) {
    const { data, isFirst } = props;
    const { Avatar, AvatarTitle, Title, PublishedDate, Description, Id } = data;

    const componentFirst = (
        <Row gutter={8}>
            <Col flex='160px'>{stringHelper.isNullOrEmpty(Avatar) && <img src={Avatar} alt={AvatarTitle} width='100%' style={{ padding: '8px' }} />}</Col>
            <Col flex='1'>
                <div className={cx('content-right')}>
                    <Link to={commonRender.renderLinkNewsDetail(Id)} className={cx('title')}>
                        {Title}
                    </Link>
                    <div className={cx('date')}>{datetimeHelper.formatDateToDateVN(PublishedDate)}</div>
                    <div className={cx('description')}>{Description}</div>
                </div>
            </Col>
        </Row>
    );

    const componentDefault = (
        <div className={cx('content-default')}>
            <div className={cx('icon')}></div>
            <Link to={commonRender.renderLinkNewsDetail(Id)} className={cx('title')}>
                {Title}
            </Link>
        </div>
    );

    return (
        <>
            {isFirst ? componentFirst : componentDefault}
            {/* <Row gutter={8}>
                <Col flex='160px'>{stringHelper.isNullOrEmpty(avatar) && <img src={avatar} alt={avatarTitle} width='100%' style={{ padding: '8px' }} />}</Col>
                <Col flex='1'>
                    <div className={cx('content-right')}>
                        <Link to={commonRender.renderLinkNewsDetail(id)} className={cx('title')}>
                            {title}
                        </Link>
                        <div className={cx('date')}>{datetimeHelper.formatDateToDateVN(publishedDate)}</div>
                        <div className={cx('description')}>{description}</div>
                    </div>
                </Col>
            </Row> */}
        </>
    );
}

export default PublishedNewsListCategoryPageItem;
