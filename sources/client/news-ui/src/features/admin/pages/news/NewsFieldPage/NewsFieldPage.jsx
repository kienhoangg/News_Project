import { Divider, Form, Button, Input, Modal } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState, useRef } from 'react';
import NewsFieldPageSearch from './NewsFieldPageSearch/NewsFieldPageSearch';
import NewsFieldTableData from './NewsFieldTableData/NewsFieldTableData';
import styles from './NewsFieldPage.module.scss';
import classNames from 'classnames/bind';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { FileAddFilled } from '@ant-design/icons';
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

NewsFieldPage.propTypes = {};

NewsFieldPage.defaultProps = {};

function NewsFieldPage(props) {
  const [newsData, setNewsData] = useState({});
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
   * Gọi api lấy dữ liệu danh sách
   */
  const fetchProductList = async () => {
    try {
      const response = await newsApi.getNewsFieldAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
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

  const handleDeleteFieldNews = async (id) => {
    try {
      await newsApi.deleteFieldNews(id);
      openNotification('Xóa nguồn tin thành công');
      fetchProductList();
    } catch (error) {
      openNotification('Xóa nguồn tin thất bại', '', NotificationType.ERROR);
    }
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
    values = {
      Title: values?.title ?? '',
      Description: values?.description ?? '',
      Order: parseInt(values?.order ?? 0),
      Factor: parseInt(values?.factor ?? 0),
      BiggestFactor: parseInt(values?.biggestFactor ?? 0),
    };
    insertFieldNews(values);
    form.resetFields();
  };
  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const insertFieldNews = async (values) => {
    try {
      await newsApi.insertFieldNews(values);
      setIsModalOpen(false);
      fetchProductList();
      openNotification('Tạo mới lĩnh vực thành công');
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };
  return (
    <div className={cx('wrapper')}>
      {
        //#region Modal tạo mới
      }
      <Modal
        className={cx('modal-insert-source-news')}
        title='Thêm mới lĩnh vực'
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
          <Form.Item name='description' label='Mô tả'>
            <TextArea />
          </Form.Item>
          <Form.Item name='order' label='Số thứ tự'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='factor' label='Hệ số'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='biggestFactor' label='Hệ số lớn nhất'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='Tạo mới'>
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {
        //#endregion */
      }

      <div className={cx('top')}>
        <NewsFieldPageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-field-news')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>

      <Divider style={{ margin: '0' }} />

      <div className={cx('table-data')}>
        <NewsFieldTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteFieldsNew={handleDeleteFieldNews}
        />
      </div>
    </div>
  );
}

export default NewsFieldPage;
