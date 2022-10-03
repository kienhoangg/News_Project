import React from 'react';
import PropTypes from 'prop-types';
import styles from './CollectionNewsDetail.module.scss';
import classNames from 'classnames/bind';
import { Card, Col, Divider, Form, Modal, Row } from 'antd';
import datetimeHelper from 'helpers/datetimeHelper';

const cx = classNames.bind(styles);

CollectionNewsDetail.propTypes = {
    data: PropTypes.object,
};

CollectionNewsDetail.defaultProps = {};

function CollectionNewsDetail(props) {
    const { open, onCancel, confirmLoading } = props;
    const { data } = props;

    return (
        <Modal
            confirmLoading={confirmLoading}
            open={open}
            title='Hiển thị thông tin'
            okButtonProps={{
                style: {
                    display: 'none',
                },
            }}
            cancelText='Thoát'
            onCancel={onCancel}
            width={1300}
            centered
            onOk={() => {}}
        >
            <Row gutter={8}>
                <Col span={16}>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Tiêu đề</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.Title}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Ảnh đại diện</div>
                        </Col>
                        <Col span={20}>
                            <div style={{}}></div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Tiêu đề ảnh</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.TitleAvatar}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Mô tả</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.Description}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Nội dung</div>
                        </Col>
                        <Col span={20}>
                            <div dangerouslySetInnerHTML={{ __html: data?.Content }}></div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Ngày tạo</div>
                        </Col>
                        <Col span={20}>
                            <div>{datetimeHelper.formatDateToDateVN(data?.CreatedDate)}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Người tạo</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.CreatedBy}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Loại tin</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.CategoryText}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Nguồn</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.SourceText}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} className={cx('row-item')}>
                        <Col span={4}>
                            <div className={cx('row-item-label')}>Tác giả</div>
                        </Col>
                        <Col span={20}>
                            <div>{data?.AuthorName}</div>
                        </Col>
                    </Row>
                </Col>
                <Col span={8}>
                    <Card style={{ width: '100%' }}>
                        <p>
                            Trạng thái tin tức: <span>Tin đã xuất bản</span>
                        </p>
                        <Divider style={{ margin: '0' }} />
                    </Card>
                </Col>
            </Row>
        </Modal>
    );
}

export default CollectionNewsDetail;
