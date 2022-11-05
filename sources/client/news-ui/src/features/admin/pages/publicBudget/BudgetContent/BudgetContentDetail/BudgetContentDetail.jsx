import { FileOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import classNames from 'classnames/bind';
import imageHelper from 'helpers/imageHelper';
import styles from './BudgetContentDetail.module.scss';
const cx = classNames.bind(styles);

BudgetContentDetail.propTypes = {};

function BudgetContentDetail(props) {
  const { open, onCancel, confirmLoading, categoryAll } = props;
  const { data } = props;

  const findCategoryName = (id) => {
    const cateory = categoryAll.find((x) => x.Id === id);
    return cateory?.Title;
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
              <div className={cx('row-item-label')}>Tệp dính kèm</div>
            </Col>
            <Col span={20}>
              {imageHelper.getNameFile(data?.FileAttachment) && (
                <div
                  className={cx('file-attachment')}
                  // onClick={() =>
                  //   window.open(getLinkFileAttachment(data?.FilePath))
                  // }
                >
                  <FileOutlined />{' '}
                  {imageHelper.getNameFile(data?.FileAttachment)}
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
}

export default BudgetContentDetail;
