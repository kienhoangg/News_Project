import { Divider, Form, Button, Input, Modal, Select } from 'antd';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import documentApi from 'apis/documentApi';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import styles from './DocumentCategoryPage.module.scss';
import DocumentCategoryPageSearch from './DocumentCategoryPageSearch/DocumentCategoryPageSearch';
import DocumentCategoryTableData from './DocumentCategoryTableData/DocumentCategoryTableData';
import { FileAddFilled } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { TypeUpdate } from 'common/constant';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

DocumentCategoryPage.propTypes = {};

DocumentCategoryPage.defaultProps = {};

function DocumentCategoryPage(props) {
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

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    // if (isFirstCall.current) {
    //   isFirstCall.current = false;
    //   return;
    // }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * Gọi api lấy dữ liệu danh sách loại văn bản tin
   */
  const fetchCategoryList = async () => {
    try {
      const response = await documentApi.getDocumentCategoryAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification('Lấy loại văn bản thất bại', '', NotificationType.ERROR);
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
      await documentApi.insertCategoryDocument(values);
      setIsModalOpen(false);
      fetchCategoryList();
      openNotification('Tạo mới loại văn bản thành công');
    } catch (error) {
      openNotification(
        'Tạo mới loại văn bản thất bại',
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

  const handleDeleteCategoryNew = async (id) => {
    try {
      await documentApi.deleteCategoryDocument(id);
      openNotification('Xóa loại văn bản thành công');
      fetchCategoryList();
    } catch (error) {
      openNotification('Xóa loại văn bản thất bại', '', NotificationType.ERROR);
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

  const handleUpdateStatusNew = async (values) => {
    try {
      await documentApi.updatStatusCategoryDocument({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchCategoryList();
      openNotification('Cập nhật thành công');
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
  };

  return (
    <div className={cx('wrapper')}>
      {
        //#region popup thêm mới
      }
      <Modal
        className={cx('modal-category-news')}
        title='Thêm mới loại văn bản tin'
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
        <DocumentCategoryPageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-field-document')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <DocumentCategoryTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteCategoryNew}
          updateStatusNew={handleUpdateStatusNew}
        />
      </div>
    </div>
  );
}

export default DocumentCategoryPage;
