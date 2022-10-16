import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedEvaluatePage.module.scss';
import classNames from 'classnames/bind';
import { Button, Radio, Row, Space } from 'antd';

const cx = classNames.bind(styles);

PublishedEvaluatePage.propTypes = {};

PublishedEvaluatePage.defaultProps = {};

function PublishedEvaluatePage(props) {
    // const [value, setValue] = useState(1);
    // const onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    // };

    const listQuestions = [
        {
            Id: 1,
            Title: 'Đánh giá về mức độ chấp hành chính sách nhà nước',
        },
        {
            Id: 1,
            Title: 'Đánh giá về mức độ chấp hành chính sách nhà nước',
        },
        {
            Id: 1,
            Title: 'Đánh giá về mức độ chấp hành chính sách nhà nước',
        },
        {
            Id: 1,
            Title: 'Đánh giá về mức độ chấp hành chính sách nhà nước',
        },
        {
            Id: 1,
            Title: 'Đánh giá về mức độ chấp hành chính sách nhà nước',
        },
        {
            Id: 1,
            Title: 'Đánh giá về mức độ chấp hành chính sách nhà nước',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <Row className={cx('banner')}>
                <div className={cx('banner-content')}>
                    <h3>Đánh giá sự phục vụ cơ quan nhà nước xã Đông Cuông</h3>
                </div>
            </Row>
            <Row className={cx('tutorial')}>
                <div>
                    Hướng dẫn: Lựa chọn phương án đánh giá và bấm vào nút "Ý kiến" tương ứng để đánh giá chất lượng phục vụ của các cơ quan chuyên môn. Xem tổng hợp kết quả đánh giá: Bấm vào nút "Kết
                    quả".
                </div>
            </Row>
            <Row className={cx('title')}>
                <h3>ĐÁNH GIÁ SỰ PHỤC VỤ CỦA CƠ QUAN HÀNH CHÍNH NHÀ NƯỚC</h3>
            </Row>
            {Array.isArray(listQuestions) &&
                listQuestions.map((item, index) => {
                    const component = (
                        <Row className={cx('question')} key={index}>
                            <div className={cx('tutorial-title')}>
                                {index + 1}. {item.Title}
                            </div>
                            {/* <Radio.Group onChange={onChange} value={value}> */}
                            <Radio.Group size='small'>
                                <Space direction='vertical'>
                                    <Radio value={1}>Rất hài lòng</Radio>
                                    <Radio value={2}>Hài lòng</Radio>
                                    <Radio value={3}>Chấp nhận được</Radio>
                                    <Radio value={4}>Không hài lòng</Radio>
                                    <Radio value={5}>Không thể chấp nhận được</Radio>
                                </Space>
                            </Radio.Group>
                            <div className={cx('btn-group')}>
                                <Button type='primary' size='small'>
                                    Bình chọn
                                </Button>
                                <Button type='primary' size='small'>
                                    Kết quả
                                </Button>
                            </div>
                        </Row>
                    );
                    return component;
                })}
        </div>
    );
}

export default PublishedEvaluatePage;
