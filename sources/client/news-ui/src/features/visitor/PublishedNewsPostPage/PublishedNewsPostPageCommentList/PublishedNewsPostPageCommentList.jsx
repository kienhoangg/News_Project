import React from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedNewsPostPageCommentList.module.scss';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import datetimeHelper from 'helpers/datetimeHelper';

const cx = classNames.bind(styles);

PublishedNewsPostPageCommentList.propTypes = {
    total: PropTypes.number,
    data: PropTypes.array,
    handleOnlClickSeeMore: PropTypes.func,
};

PublishedNewsPostPageCommentList.defaultProps = {
    total: 0,
    data: [],
    handleOnlClickSeeMore: () => {},
};

const fakeData = {
    Id: 1,
    Name: 'Nguyễn Ngọc Hà',
    CreatedDate: '2022-09-30T13:54:50.005Z',
    Content: 'đầy đủ tất cả nhưng tôi thấy diện tích tự nhiên có thể khác nhau đó có phải vậy không?Tôi nghĩ nó phải là 6.886,28km2 mới đúng chứ.mọi thứ đều đầy đủ hết không có gì nữa',
};
const dataFakeComments = [];

for (let index = 0; index < 10; index++) {
    dataFakeComments.push(fakeData);
}

function PublishedNewsPostPageCommentList(props) {
    const { data, total, handleOnlClickSeeMore } = props;

    return (
        <div className={cx('wrapper')}>
            {Array.isArray(dataFakeComments) &&
                dataFakeComments.map((item, index) => {
                    return (
                        <Row gutter={0} key={index} className={cx('item')}>
                            <Col flex='60px' className={cx('item-left')}>
                                <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: '50px', color: '#16b900' }} />
                            </Col>
                            <Col flex='1' className={cx('item-right')}>
                                <Row gutter={0}>
                                    <Col span={24} style={{ marginBottom: 4 }}>
                                        <span className={cx('user-name')}>{item.Name}</span>
                                        <span className={cx('time')}>
                                            <span> - </span>
                                            {datetimeHelper.formatDatetimeToDateVN(item.CreatedDate)}
                                        </span>
                                    </Col>
                                    <Col span={24}>{item.Content}</Col>
                                </Row>
                            </Col>
                        </Row>
                    );
                })}
            {total > data.length && (
                <div
                    style={{ cursor: 'pointer', marginBottom: 16 }}
                    onClick={() => {
                        if (handleOnlClickSeeMore) handleOnlClickSeeMore(total, data.length);
                    }}
                >
                    Xem thêm bình luận >>
                </div>
            )}
        </div>
    );
}

export default PublishedNewsPostPageCommentList;
