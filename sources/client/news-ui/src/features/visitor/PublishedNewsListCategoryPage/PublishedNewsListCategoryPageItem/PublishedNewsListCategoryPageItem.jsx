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
};

PublishedNewsListCategoryPageItem.defaultProps = {};

function PublishedNewsListCategoryPageItem(props) {
    const { data } = props;
    const { avatar, avatarTitle, title, publishedDate, description, id } = data;
    console.log('PublishedNewsListCategoryPageItem', props);

    return (
        <>
            <Row gutter={8}>
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
            </Row>
        </>
    );
}

export default PublishedNewsListCategoryPageItem;
