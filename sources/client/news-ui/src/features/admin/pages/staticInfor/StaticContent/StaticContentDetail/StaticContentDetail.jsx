import React from 'react';
import PropTypes from 'prop-types';
import styles from './StaticContentDetail.module.scss';
import classNames from 'classnames/bind';
import { Modal, Card, Divider } from 'antd';
import { Row } from 'antd';
import { Col } from 'antd';
import datetimeHelper from 'helpers/datetimeHelper';
import { FileOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

StaticContentDetail.propTypes = {};

function StaticContentDetail(props) {
  const { open, onCancel, confirmLoading, categoryAll } = props;
  const { data } = props;

  const findCategoryName = (id) => {
    const cateory = categoryAll.find((x) => x.Id === id);
    return cateory?.Title;
  };

  const getLinkFileAttachment = (filePath) => {
    return filePath
      ? filePath?.indexOf('https://') === 0 ||
        filePath?.indexOf('http://') === 0
        ? filePath
        : (window.location.origin === 'http://localhost:3000'
            ? 'https://localhost:7122/'
            : window.location.origin) +
          (filePath.startsWith('/wwwroot/', '')
            ? filePath.replaceAll('/wwwroot/', '')
            : filePath)
      : '/';
  };

  const getNameFile = (filePath) => {
    const file = filePath.replaceAll(
      '/wwwroot/UploadFiles/FileAttachments/',
      ''
    );
    const fileName =
      file.substring(0, file.lastIndexOf('_')) +
      file.substring(file.lastIndexOf('.'), file.length);

    return fileName;
  };

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
              <div className={cx('row-item-label')}>Mô tả</div>
            </Col>
            <Col span={20}>
              <div>{data?.Descritpion}</div>
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
              <div className={cx('row-item-label')}>Danh mục</div>
            </Col>
            <Col span={20}>
              <div>{findCategoryName(data?.StaticCategoryId)}</div>
            </Col>
          </Row>
          <Row gutter={16} className={cx('row-item')}>
            <Col span={4}>
              <div className={cx('row-item-label')}>Ảnh đại diện</div>
            </Col>
            <Col span={20}>
              <div>
                <img
                  alt=''
                  style={{ width: '10vw' }}
                  src={
                    data?.Avatar
                      ? data?.Avatar?.indexOf('https://') === 0 ||
                        data?.Avatar?.indexOf('http://') === 0
                        ? data?.Avatar
                        : (window.location.origin === 'http://localhost:3000'
                            ? 'https://localhost:7122/'
                            : window.location.origin) +
                          (data?.Avatar.startsWith('/wwwroot/', '')
                            ? data?.Avatar.replaceAll('/wwwroot/', '')
                            : data?.Avatar)
                      : '/'
                  }
                />
              </div>
            </Col>
          </Row>
          <Row gutter={16} className={cx('row-item')}>
            <Col span={4}>
              <div className={cx('row-item-label')}>Tệp dính kèm</div>
            </Col>
            <Col span={20}>
              {getNameFile(data?.FilePath) && (
                <div
                  className={cx('file-attachment')}
                  onClick={() =>
                    window.open(getLinkFileAttachment(data?.FilePath))
                  }
                >
                  <FileOutlined /> {getNameFile(data?.FilePath)}
                </div>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Card style={{ width: '100%' }}>
            <p>
              Trạng thái:{' '}
              <span>{data?.Status === 0 ? 'Chưa xuất bản' : 'Xuất bản'}</span>
            </p>
            <Divider style={{ margin: '0' }} />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
}

export default StaticContentDetail;
