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
const Mode = {
  Create: 1,
  Edit: 0,
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

  const detail = useRef({});
  const idEdit = useRef();
  const mode = useRef();
  const [dataFilter, setDataFilter] = useState({
    fieldNews: [],
  });
  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
    }
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

  const getDataFilter = async () => {
    const filterAll = {
      currentPage: 1,
      pageSize: 9_999_999,
      direction: Direction.DESC,
      orderBy: 'CreatedDate',
    };
    const responseFieldNews = newsApi.getNewsFieldAll(filterAll);
    Promise.all([responseFieldNews]).then((values) => {
      setDataFilter({
        fieldNews: values[0]?.PagedData?.Results ?? [],
      });
    });
  };

  const handleOnClickShowRowDetail = async (Id) => {
    const response = await getSourceNewById(Id);
    const dicDetail = [
      {
        type: 'string',
        label: 'Danh mục cấp cha',
        content: response?.ParentId ?? '',
      },
      {
        type: 'string',
        label: 'Tiêu đề',
        content: response?.CategoryNewsName,
      },
      {
        type: 'number',
        label: 'Số thứ tự',
        content: response?.Order,
      },
      {
        type: 'string',
        label: 'Loại tin',
        content: response?.FieldNews_SK_FK ?? '',
      },
      {
        type: 'string',
        label: 'Keyword',
        content: response?.Keyword ?? '',
      },
    ];

    detail.current = dicDetail;
    setConfirmLoading(false);
    setOpenCollectionDetail(true);
  };

  const showModal = () => {
    mode.current = Mode.Create;
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
  const onFinish = async (values) => {
    let parentID = null;
    let fieldNews_SK_FK = null;
    if (values.parentId) {
      parentID = parseInt(values.parentId);
    }
    if (values.FieldNews_SK_FK) {
      fieldNews_SK_FK = parseInt(values.FieldNews_SK_FK);
    }
    values = {
      CategoryNewsName: values?.title,
      Order: parseInt(values?.order ?? 0),
      Keyword: values?.keyword,
    };
    if (parentID) {
      values.ParentId = parentID;
    }
    if (fieldNews_SK_FK) {
      values.FieldNews_SK_FK = fieldNews_SK_FK;
    }

    setIsModalOpen(false);
    if (mode.current === Mode.Create) {
      await insertCategoryNews(values);
    } else {
      await updateSounceNews(values);
    }
    form.resetFields();
    fetchCategoryList();
  };

  const updateSounceNews = async (values) => {
    try {
      await newsApi.updateCategoryNews(idEdit.current, values);
      openNotification('Cập nhật thành công');
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
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

  const renderField = (
    <Select
      placeholder='Chọn lĩnh vực'
      style={{ width: '100%' }}
      allowClear={true}
    >
      {dataFilter?.fieldNews.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  async function getSourceNewById(id) {
    try {
      const res = await newsApi.getNewsCategoryByID(id);
      return res;
    } catch (err) {
      openNotification(
        'Lấy chi tiết dữ liệu thất bại',
        '',
        NotificationType.ERROR
      );
      return null;
    }
  }

  async function handleUpdate(id) {
    const res = await getSourceNewById(id);
    idEdit.current = id;
    mode.current = Mode.Edit;
    form?.setFieldsValue({
      title: res?.CategoryNewsName,
      FieldNews_SK_FK: res?.FieldNews_SK_FK,
      description: res?.Description,
      order: res?.Order,
      keyword: res?.Keyword,
      parentId: res?.ParentId,
    });
    setIsModalOpen(true);
  }
  return (
    <div className={cx('wrapper')}>
      {
        //#region popup thêm mới
      }
      <Modal
        className={cx('modal-category-news')}
        title={
          mode.current === Mode.Edit
            ? 'Cập nhật danh mục tin'
            : 'Tạo mới danh mục tin'
        }
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

          <Form.Item name='FieldNews_SK_FK' label='Loại tin'>
            {renderField}
          </Form.Item>
          <Form.Item name='keyword' label='Keyword'>
            <Input placeholder='Nhập Keyword' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              htmlType={mode.current === Mode.Edit ? 'Cập nhật' : 'Tạo mới'}
            >
              {mode.current === Mode.Edit ? 'Cập nhật' : 'Tạo mới'}
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
          updateData={handleUpdate}
        />
      </div>

      <AdminCollectionDetail
        listData={detail.current}
        open={openCollectionDetail}
        onCancel={() => {
          setOpenCollectionDetail(false);
        }}
      />
    </div>
  );
}

export default NewsCategoryPage;
