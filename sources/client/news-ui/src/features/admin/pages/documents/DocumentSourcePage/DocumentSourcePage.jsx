import documentApi from 'apis/documentApi';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import styles from './DocumentSourcePage.module.scss';
import DocumentSourcePageSearch from './DocumentSourcePageSearch/DocumentSourcePageSearch';
import DocumentSourceTableData from './DocumentSourceTableData/DocumentSourceTableData';
import { Divider, Form, Button, Input, Modal, Select } from 'antd';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { Option } from 'antd/lib/mentions';
import { FileAddFilled } from '@ant-design/icons';

const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

DocumentSourcePage.propTypes = {};

DocumentSourcePage.defaultProps = {};

function DocumentSourcePage(props) {
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
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

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      const response = await documentApi.getDocumentSourceAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification(
        'Lấy cơ quan ban hành thất bại',
        '',
        NotificationType.ERROR
      );
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
    let parentID = null;
    if (values.parentId) {
      parentID = parseInt(values.parentId);
    }
    values = {
      Title: values?.title,
      Order: parseInt(values?.order ?? 0),
      Description: values?.description,
    };
    if (parentID) {
      values.ParentId = parentID;
    }
    insertCategoryNews(values);
    form.resetFields();
  };

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const insertCategoryNews = async (values) => {
    try {
      await documentApi.insertSourceDocument(values);
      setIsModalOpen(false);
      fetchProductList();
      openNotification('Tạo mới cơ quan ban hành thành công');
    } catch (error) {
      openNotification(
        'Tạo mới cơ quan ban hành thất bại',
        '',
        NotificationType.ERROR
      );
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

  const handleDeleteSourceNew = async (id) => {
    try {
      await documentApi.deleteSourceDocument(id);
      openNotification('Xóa cơ quan ban hành thành công');
      fetchProductList();
    } catch (error) {
      openNotification(
        'Xóa cơ quan ban hành thất bại',
        '',
        NotificationType.ERROR
      );
    }
  };

  const renderOption = (
    <Select
      placeholder='Chọn cấp cha'
      style={{ width: '100%' }}
      allowClear={true}
    >
      {newsData?.data.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className={cx('wrapper')}>
      {
        //#region popup thêm mới
      }
      <Modal
        className={cx('modal-category-news')}
        title='Thêm mới cơ quan ban hành tin'
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
          <Form.Item name='parentId' label='Danh mục cấp cha'>
            {renderOption}
          </Form.Item>
          <Form.Item name='order' label='Số thứ tự'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='description' label='Mô tả'>
            <TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='Tạo mới'>
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {
        //#endregion
      }

      <div className={cx('top')}>
        <DocumentSourcePageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-signer-document')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <DocumentSourceTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
        />
      </div>
    </div>
  );
}

export default DocumentSourcePage;
