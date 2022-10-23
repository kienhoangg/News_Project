import { Divider, Form, Button, Input, Modal, Select } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useRef, useState } from 'react';
import NewsCategoryPageSearch from './NewsCategoryPageSearch/NewsCategoryPageSearch';
import NewsCategoryTableData from './NewsCategoryTableData/NewsCategoryTableData';
import styles from './NewsCategoryPage.module.scss';
import classNames from 'classnames/bind';
import AdminCollectionDetail from 'features/admin/components/AdminCollectionDetail/AdminCollectionDetail';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { Option } from 'antd/lib/mentions';
import { FileAddFilled } from '@ant-design/icons';
import { TypeUpdate } from 'common/constant';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

NewsCategoryPage.propTypes = {};

NewsCategoryPage.defaultProps = {};

function NewsCategoryPage(props) {
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

  const [openCollectionDetail, setOpenCollectionDetail] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const dataDetail = useRef({});

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
   * Gọi api lấy dữ liệu danh sách danh mục tin
   */
  const fetchCategoryList = async () => {
    try {
      const response = await newsApi.getNewsCategoryAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification('Lấy  danh mục thất bại', '', NotificationType.ERROR);
    }
  };

  const handleOnClickShowRowDetail = (values) => {
    const fetchItem = async () => {
      setConfirmLoading(true);

      try {
        const response = await newsApi.getNewsCategoryById(values?.id);
        var dicDetail = [
          {
            type: 'string',
            label: 'Tiêu đề',
            content: response?.Title,
          },
          {
            type: 'string',
            label: 'Danh mục cấp cha',
            content: response?.ParentTitle ?? '',
          },
          {
            type: 'number',
            label: 'Số thứ tự',
            content: response?.OrderNumber,
          },
          {
            type: 'ID',
            label: 'ID',
            content: response?.Id,
          },
          {
            type: 'datetime',
            label: 'Ngày tạo',
            content: response?.CreatedDate,
          },
          {
            type: 'datetime',
            label: 'Ngày sửa cuối',
            content: response?.ModifiedDate,
          },
          {
            type: 'string',
            label: 'Người tạo',
            content: response?.CreatedBy,
          },
          {
            type: 'string',
            label: 'Người sửa',
            content: response?.ModifiedBy,
          },
          {
            type: 'string',
            label: 'File đính kèm',
            content: response?.FileUrl,
          },
        ];

        dataDetail.current = dicDetail;
        setConfirmLoading(false);
        setOpenCollectionDetail(true);
      } catch (error) {
        console.log('Failed to fetch list: ', error);
      }
    };

    fetchItem();
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
      CategoryNewsName: values?.title,
      Order: parseInt(values?.order ?? 0),
      Keyword: values?.keyword,
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
      await newsApi.insertCategoryNews(values);
      setIsModalOpen(false);
      fetchCategoryList();
      openNotification('Tạo mới danh mục thành công');
    } catch (error) {
      openNotification('Tạo mới danh mục thất bại', '', NotificationType.ERROR);
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
      await newsApi.deleteCategoryNews(id);
      openNotification('Xóa danh mục thành công');
      fetchCategoryList();
    } catch (error) {
      openNotification('Xóa danh mục thất bại', '', NotificationType.ERROR);
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await newsApi.updateStatusCategoryNews({
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

  const renderOption = (
    <Select
      placeholder='Chọn cấp cha'
      style={{ width: '100%' }}
      allowClear={true}
    >
      {newsData?.data.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.CategoryNewsName}
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
        title='Thêm mới danh mục tin'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
          <Form.Item name='parentId' label='Danh mục cấp cha'>
            {renderOption}
          </Form.Item>
          <Form.Item
            name='title'
            label='Tiêu đề'
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='order' label='Số thứ tự'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item name='typeNews' label='Loại tin'>
            <Input placeholder='Nhập và chọn loại tin' />
          </Form.Item>
          <Form.Item name='keyword' label='Keyword'>
            <Input placeholder='Nhập Keyword' />
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
        <NewsCategoryPageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-category-news')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <NewsCategoryTableData
          data={newsData}
          onClickShowRowDetail={handleOnClickShowRowDetail}
          setPagination={handleChangePagination}
          deleteCategoryNew={handleDeleteCategoryNew}
          updateStatusNew={handleUpdateStatusNew}
        />
      </div>

      <AdminCollectionDetail
        listData={dataDetail.current}
        open={openCollectionDetail}
        onCancel={() => {
          setOpenCollectionDetail(false);
        }}
      />
    </div>
  );
}

export default NewsCategoryPage;
