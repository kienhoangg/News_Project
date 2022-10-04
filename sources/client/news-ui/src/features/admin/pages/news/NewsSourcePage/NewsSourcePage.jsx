import { Button, Divider, Form, Input, Modal, notification } from 'antd';
import newsApi from 'apis/newsApi';
import classNames from 'classnames/bind';
import { Direction } from 'common/enum';
import { useEffect, useRef, useState } from 'react';
import styles from './NewsSourcePage.module.scss';
import NewsSourcePageSearch from './NewsSourcePageSearch/NewsSourcePageSearch';
import NewsSourceTableData from './NewsSourceTableData/NewsSourceTableData';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const cx = classNames.bind(styles);

NewsSourcePage.propTypes = {};

NewsSourcePage.defaultProps = {};

function NewsSourcePage(props) {
  const [newsData, setNewsData] = useState({});
  const isFirstCall = useRef(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }
    fetchProductList();
  }, [objFilter]);

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const fetchProductList = async () => {
    try {
      const response = await newsApi.getNewsSourceAll(objFilter);
      setNewsData({
        data: response?.data?.results ?? [],
        total: response?.data?.rowCount ?? 0,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  /**
   * Thay đổi phân trang
   */
  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction
  ) => {
    setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  /**
   * Submit form tạo nguồn tin tức
   * @param {*} values Đối tượng submit form
   */
  const onFinish = (values) => {
    insertSounceNews(values);
    form.resetFields();
  };

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const insertSounceNews = async (values) => {
    try {
      await newsApi.insertSounceNew(values);
      setIsModalOpen(false);
      fetchProductList();
      openNotification('Tạo mới nguồn tin tức thành công');
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  // TODO thông báo để demo
  const openNotification = (message, description = '', placement = 'top') => {
    notification.success({
      message,
      description,
      placement,
    });
  };

  return (
    <div className={cx('wrapper')}>
      <Modal
        className={cx('modal-insert-source-news')}
        title='Thêm mới nguồn tin tức'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
          <Form.Item
            name='title'
            label='Tiêu đề'
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='order'
            label='Số thứ tự'
            rules={[
              { required: true, message: 'Số thứ tự không được để trống' },
            ]}
          >
            <Input type='number' min={0} />
          </Form.Item>

          <Form.Item name='description' label='Mô tả'>
            <TextArea />
          </Form.Item>
          {/* <Form.Item name='status' label='Trạng thái' valuePropName='0'>
            <Select>
              <Option value='0'>Hủy duyệt</Option>
              <Option value='1'>Duyệt</Option>
            </Select>
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='submit'>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <NewsSourcePageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-source-news')}>
          <Button type='primary' onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <NewsSourceTableData
          data={newsData}
          setPagination={handleChangePagination}
        />
      </div>
    </div>
  );
}

export default NewsSourcePage;
