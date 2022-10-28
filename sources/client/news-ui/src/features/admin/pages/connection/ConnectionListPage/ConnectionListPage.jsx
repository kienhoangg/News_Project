import { Divider, Form, Input, Upload, Button, Select } from 'antd';
import { useEffect, useState } from 'react';
import ConnectionListPageSearch from './ConnectionListPageSearch/ConnectionListPageSearch';
import ConnectionTableData from './ConnectionTableData/ConnectionTableData';

import classNames from 'classnames/bind';
import styles from './ConnectionListPage.module.scss';
import linkAndCompanyApi from 'apis/linkAndCompanyApi';
import { useRef } from 'react';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { TypeUpdate } from 'common/constant';
import { Modal } from 'antd';
import { FileAddFilled, UploadOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import commonFunc from 'common/commonFunc';
import convertHelper from 'helpers/convertHelper';
import imageHelper from 'helpers/imageHelper';
import { envDomainBackend } from 'common/enviroments';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const filterAll = {
  currentPage: 1,
  pageSize: 9_999_999,
  direction: Direction.DESC,
  orderBy: 'CreatedDate',
};
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const Mode = {
  Create: 1,
  Edit: 0,
};
const cx = classNames.bind(styles);

ConnectionListPage.propTypes = {};

ConnectionListPage.defaultProps = {};

function ConnectionListPage(props) {
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
  const [popupUpdate, setPopupUpdate] = useState({
    id: null,
    show: false,
  });
  const dataDetail = useRef({});
  const [openCollectionNewsDetail, setOpenCollectionNewsDetail] =
    useState(false);
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
  });
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const mode = useRef(Mode.Create);
  const idEdit = useRef(-1);
  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
    }
    fetchProductList();
  }, [objFilter]);

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const fetchProductList = async () => {
    try {
      const response = await linkAndCompanyApi.getLinkInfoAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  const getDataFilter = async () => {
    const responseCategoryAll =
      linkAndCompanyApi.getLinkInfoCategoryAll(filterAll);

    Promise.all([responseCategoryAll]).then((values) => {
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
      });
    });
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
      await linkAndCompanyApi.deleteLinkInfo(id);
      openNotification('Xóa doanh nghiệp thành công');
      fetchProductList();
    } catch (error) {
      openNotification('Xóa doanh nghiệp thất bại', '', NotificationType.ERROR);
    }
  };

  const showModal = () => {
    setFileListAttachment([]);
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
    const { Title, Order, LinkInfoCategoryId, Link } = values;
    let bodyData = {
      Title,
      Order,
      LinkInfoCategoryId,
      Link,
    };
    if (LinkInfoCategoryId) {
      bodyData.LinkInfoCategoryId = parseInt(LinkInfoCategoryId);
    }
    let body = { JsonString: bodyData };

    if (
      fileListAttachment.length > 0 &&
      !fileListAttachment?.[0]?.isFileFormServer
    ) {
      const file = fileListAttachment[0].originFileObj;
      if (file.size > LIMIT_UP_LOAD_FILE) {
        openNotification(
          'File đính kèm đã lớn hơn 2MB',
          '',
          NotificationType.ERROR
        );
        return;
      }
      body.FileAttachment = file;
    } else if (
      fileListAttachment?.[0]?.isFileFormServer &&
      fileListAttachment.length > 0
    ) {
      const files = [...fileListAttachment];
      bodyData = {
        ...bodyData,
        Avatar: files?.[0]?.url?.replaceAll(envDomainBackend, ''),
      };
    }
    body = { ...body, JsonString: bodyData };
    form.resetFields();
    setFileListAttachment([]);
    upsertSounceNews(body);
  };

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const upsertSounceNews = async (values) => {
    try {
      setIsModalOpen(false);

      var formData = new FormData();
      formData.append('JsonString', convertHelper.Serialize(values.JsonString));

      if (values.FileAttachment) {
        formData.append('FileAttachment', values.FileAttachment);
      }
      if (mode.current === Mode.Create) {
        await linkAndCompanyApi.insertLinkInfo(formData);
      } else {
        await linkAndCompanyApi.updateLinkInfo(idEdit.current, formData);
      }

      openNotification('Thành công');
      fetchProductList();
      setFileListAttachment([]);
    } catch (error) {
      openNotification('Thất bại', '', NotificationType.ERROR);
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await linkAndCompanyApi.updateStatusLinkInfo({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification('Cập nhật thành công');
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
  };

  const handleOnClickShowRowDetail = async (values) => {
    const detailRow = await fetchItem(values);
    if (!detailRow) {
      return;
    }
    dataDetail.current = detailRow;
    setOpenCollectionNewsDetail(true);
  };

  const fetchItem = async (values) => {
    try {
      return await linkAndCompanyApi.getLinkInfoById(values?.Id);
    } catch (error) {
      openNotification('Lấy dữ liệu thất bại', '', NotificationType.ERROR);
      return null;
    }
  };

  const renderStaticCategoryId = (
    <Select
      placeholder='Chọn danh mục'
      style={{ width: '100%' }}
      allowClear={true}
    >
      {dataFilter?.categoryAll.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const handleEdit = async (id) => {
    const res = await linkAndCompanyApi.getLinkInfoById(id);
    idEdit.current = id;
    mode.current = Mode.Edit;
    form?.setFieldsValue({
      Title: res?.Title,
      Link: res?.Link,
      LinkInfoCategoryId: res?.LinkInfoCategoryId,
      Order: res?.Order,
    });

    if (res?.Avatar) {
      setFileListAttachment([
        {
          isFileFormServer: true,
          uid: '1',
          name: imageHelper.getNameFile(res?.Avatar),
          status: 'done',
          url: imageHelper.getLinkImageUrl(res?.Avatar),
        },
      ]);
    }
    setIsModalOpen(true);
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
            name='Title'
            label='Tiêu đề'
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label='Danh mục liên kết' name='LinkInfoCategoryId'>
            {renderStaticCategoryId}
          </Form.Item>

          <Form.Item name='Link' label='Địa chỉ (link)'>
            <Input />
          </Form.Item>

          <Form.Item name='Order' label='Số thứ tự'>
            <Input type='number' min={0} />
          </Form.Item>

          <Form.Item name='lb-attachment' label='Ảnh đại diện'>
            <Upload
              listType='picture'
              defaultFileList={fileListAttachment}
              onChange={handleChangeAttachment}
              customRequest={commonFunc.dummyRequest}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='Tạo mới'>
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <ConnectionListPageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-source-news')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <ConnectionTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
          updateStatusNew={handleUpdateStatusNew}
          onClickShowRowDetail={handleOnClickShowRowDetail}
          onClickEdit={handleEdit}
        />
      </div>
    </div>
  );
}

export default ConnectionListPage;
