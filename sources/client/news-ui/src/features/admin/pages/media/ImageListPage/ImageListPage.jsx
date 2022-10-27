import { Divider, Form, Input, Select, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import ImageListPageSearch from './ImageListPageSearch/ImageListPageSearch';
import ImageListTableData from './ImageListTableData/ImageListTableData';

import mediaApi from 'apis/mediaApi';
import classNames from 'classnames/bind';
import styles from './ImageListPage.module.scss';
import { Direction } from 'common/enum';
import { useRef } from 'react';
import { openNotification } from 'helpers/notification';
import { NotificationType } from 'common/enum';
import { Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { FileAddFilled, UploadOutlined } from '@ant-design/icons';
import commonFunc from 'common/commonFunc';
import convertHelper from 'helpers/convertHelper';
import { TypeUpdate } from 'common/constant';
import { envDomainBackend } from 'common/enviroments';
import imageHelper from 'helpers/imageHelper';

const cx = classNames.bind(styles);
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

ImageListPage.propTypes = {};

ImageListPage.defaultProps = {};

function ImageListPage(props) {
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
  });
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState({
    imageDetail: null,
    type: null,
    show: false,
  });
  const [form] = Form.useForm();
  const [fileListAttachment, setFileListAttachment] = useState([]);

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
      // return;
    }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * Gọi API lấy chi tiết
   */
  const callApiGetDetailImage = async (id) => {
    if (!id && id !== 0) return;
    try {
      const res = await mediaApi.getDetailImage(id);
      setIsModalOpen({
        imageDetail: res,
        type: MODAL_TYPE.EDIT,
        show: true,
      });
      form.setFieldsValue({
        Title: res?.Title,
        PhotoCategoryId: res?.PhotoCategoryId,
        Order: res?.Order,
      });

      if (res?.ImagePath) {
        let links = res?.ImagePath.split(';;');
        let linksObject = [];
        for (let i = 0; i < links.length; i++) {
          linksObject.push({
            isFileFormServer: true,
            uid: i,
            name: imageHelper.getNameFile(links[i]),
            status: 'done',
            url: imageHelper.getLinkImageUrl(links[i]),
          });
        }
        setFileListAttachment(linksObject);
      }
    } catch (err) {}
  };

  /**
   * Gọi api lấy dữ liệu danh sách loại văn bản tin
   */
  const fetchCategoryList = async () => {
    try {
      const response = await mediaApi.getImageAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification(
        'Lấy danh sách hình ảnh thất bại',
        '',
        NotificationType.ERROR
      );
    }
  };

  const getDataFilter = async () => {
    const responseCategoryAll = mediaApi.getImageCategoryAll(filterAll);

    Promise.all([responseCategoryAll]).then((values) => {
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
      });
    });
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
      await mediaApi.deleteImage(id);
      openNotification('Xóa hình ảnh thành công');
      fetchCategoryList();
    } catch (error) {
      openNotification('Xóa hình ảnh thất bại', '', NotificationType.ERROR);
    }
  };
  const handleUpdateStatusNew = async (values) => {
    try {
      await mediaApi.updateStatusImage({
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

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  const onCancel = () => {
    setIsModalOpen({
      imageDetail: null,
      type: null,
      show: false,
    });
    form.resetFields();
    setFileListAttachment([]);
  };

  const onCreate = async (values) => {
    try {
      var formData = new FormData();
      formData.append('JsonString', convertHelper.Serialize(values.JsonString));

      if (values.FileAttachment) {
        for (let file of values.FileAttachment) {
          formData.append('FileAttachment', file);
        }
      }
      if (isModalOpen?.type === MODAL_TYPE.CREATE) {
        await mediaApi.insertImage(formData);
        openNotification('Tạo mới hình ảnh thành công');
      } else {
        await mediaApi.updateImage(isModalOpen?.imageDetail?.Id, formData);
        openNotification('Cập nhật hình ảnh thành công');
      }

      setIsModalOpen({
        imageDetail: null,
        type: null,
        show: false,
      });

      onCancel();

      fetchCategoryList();
    } catch (error) {
      if (isModalOpen?.type === MODAL_TYPE.CREATE) {
        openNotification(
          'Tạo mới hình ảnh thất bại',
          '',
          NotificationType.ERROR
        );
      } else {
        openNotification(
          'Cập nhật hình ảnh thất bại',
          '',
          NotificationType.ERROR
        );
      }
    }
  };

  const MODAL_TYPE = {
    EDIT: 0,
    CREATE: 1,
  };

  const renderStaticCategoryId = (
    <Select
      placeholder='Chọn cấp cha'
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

  /**
   * Submit form tạo nguồn tin tức
   * @param {*} values Đối tượng submit form
   */
  const onFinish = (values) => {
    const { Title, Order, PhotoCategoryId } = values;
    let bodyData = {
      Title,
      Order,
    };
    if (PhotoCategoryId) {
      bodyData.PhotoCategoryId = parseInt(PhotoCategoryId);
    }
    let body = { JsonString: bodyData };

    if (
      fileListAttachment.length > 0 &&
      !fileListAttachment?.[0]?.isFileFormServer
    ) {
      let listFileUpload = [];
      for (let i = 0; i < fileListAttachment.length; i++) {
        const file = fileListAttachment[i].originFileObj;
        if (file.size > LIMIT_UP_LOAD_FILE) {
          openNotification(
            `File thứ ${i + 1} đã lớn hơn 2MB`,
            '',
            NotificationType.ERROR
          );
          return;
        }
        listFileUpload.push(file);
      }

      body.FileAttachment = listFileUpload;
    } else if (
      fileListAttachment?.[0]?.isFileFormServer &&
      fileListAttachment.length > 0 &&
      isModalOpen?.type === MODAL_TYPE.EDIT
    ) {
      bodyData = {
        ...bodyData,
        ImagePath: isModalOpen?.imageDetail?.ImagePath,
      };
    }

    body = { ...body, JsonString: bodyData };

    onCreate(body);
  };

  /**
   * Cập nhật hình ảnh
   */

  return (
    <div className={cx('wrapper')}>
      {(isModalOpen?.type === MODAL_TYPE.CREATE ||
        isModalOpen?.type === MODAL_TYPE.EDIT) &&
      isModalOpen?.show ? (
        <Modal
          open={true}
          title={
            isModalOpen?.type === MODAL_TYPE.CREATE
              ? 'Tạo mới hình ảnh'
              : 'Chỉnh sửa hình ảnh'
          }
          okText={isModalOpen?.type === MODAL_TYPE.CREATE ? 'Tạo mới' : 'Lưu'}
          cancelText='Thoát'
          onCancel={onCancel}
          footer={null}
        >
          <Form
            form={form}
            {...layout}
            name='control-hooks'
            onFinish={onFinish}
          >
            <Form.Item
              label='Tiêu đề'
              name='Title'
              rules={[
                {
                  required: true,
                  message: 'Tiêu đề không được để trống',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Danh mục hình ảnh' name='PhotoCategoryId'>
              {renderStaticCategoryId}
            </Form.Item>

            <Form.Item name='Order' label='Số thứ tự'>
              <Input type='number' min={0} />
            </Form.Item>

            <Form.Item name='lb-attachment' label='Tệp đính kèm'>
              <Upload
                listType='picture'
                fileList={fileListAttachment}
                onChange={handleChangeAttachment}
                customRequest={commonFunc.dummyRequest}
                multiple={true}
                maxCount={100}
              >
                <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>

                {/* {fileListAttachment.length < 1 ? (
                <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>
              ) : null} */}
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='Tạo mới'>
                {isModalOpen?.type === MODAL_TYPE.CREATE ? 'Tạo mới' : 'Lưu'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}

      <div className={cx('top')}>
        <ImageListPageSearch setTextSearch={handleChangeTextSearch} />
        <div>
          <Button
            type='primary'
            icon={<FileAddFilled />}
            onClick={() => {
              setIsModalOpen({
                imageDetail: null,
                type: MODAL_TYPE.CREATE,
                show: true,
              });
            }}
          >
            Tạo mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <ImageListTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteCategoryNew={handleDeleteCategoryNew}
          updateStatusNew={handleUpdateStatusNew}
          editImage={(res) => callApiGetDetailImage(res?.Id)}
        />
      </div>
    </div>
  );
}

export default ImageListPage;
