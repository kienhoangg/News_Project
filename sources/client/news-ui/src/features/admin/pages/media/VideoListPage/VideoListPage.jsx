import { Button, Divider, Form, Input, Modal, Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import VideoListPageSearch from './VideoListPageSearch/VideoListPageSearch';
import VideoListTableData from './VideoListTableData/VideoListTableData';

import mediaApi from 'apis/mediaApi';
import classNames from 'classnames/bind';
import styles from './VideoListPage.module.scss';
import { openNotification } from 'helpers/notification';
import { Direction, NotificationType } from 'common/enum';
import convertHelper from 'helpers/convertHelper';
import { Option } from 'antd/lib/mentions';
import commonFunc from 'common/commonFunc';
import { UploadOutlined } from '@ant-design/icons';
import imageHelper from 'helpers/imageHelper';
import TextArea from 'antd/lib/input/TextArea';
import { TypeUpdate, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import Loading from 'components/Loading/Loading';

const cx = classNames.bind(styles);

VideoListPage.propTypes = {};

VideoListPage.defaultProps = {};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const filterAll = {
  currentPage: 1,
  pageSize: 9_999_999,
  direction: Direction.DESC,
  orderBy: DEFAULT_COLUMN_ORDER_BY,
};

function VideoListPage(props) {
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: DEFAULT_COLUMN_ORDER_BY,
    keyword: '',
  });
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });

  const MODAL_TYPE = {
    EDIT: 0,
    CREATE: 1,
  };

  const [isModalOpen, setIsModalOpen] = useState({
    imageDetail: null,
    type: null,
    show: false,
  });

  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
  });

  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState([]);
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(true);

  const onCancel = () => {
    setIsModalOpen({
      imageDetail: null,
      type: null,
      show: false,
    });
    form.resetFields();
    setFileListAttachment([]);
    setAvatar([]);
  };

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const handleChangeAvatar = ({ fileList: newFileList }) => {
    setAvatar(newFileList);
  };

  const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb

  const handleUpdateStatusNew = async (values) => {
    try {
      setConfirmLoading(true);
      await mediaApi.updateStatusVideo({
        ids: [values.Id],
        value: values.Status === 0,
        field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDeleteCategoryNew = async (id) => {
    try {
      setConfirmLoading(true);
      await mediaApi.deleteVideo(id);
      openNotification('X??a h??nh ???nh th??nh c??ng');
      fetchProductList();
    } catch (error) {
      openNotification('X??a h??nh ???nh th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * G???i API l???y chi ti???t
   */
  const callApiGetDetailVideo = async (id) => {
    if (!id && id !== 0) return;
    try {
      setConfirmLoading(true);
      const res = await mediaApi.getDetailVideo(id);
      setIsModalOpen({
        imageDetail: res,
        type: MODAL_TYPE.EDIT,
        show: true,
      });
      form.setFieldsValue({
        Title: res?.Title,
        VideoCategoryId:
          dataFilter?.categoryAll.find((x) => x.Id === res?.VideoCategoryId)
            ?.Title ?? '',
        LinkVideo: res?.LinkVideo,
      });

      res?.FileAttachment &&
        setFileListAttachment([
          {
            isFileFormServer: true,
            uid: '1',
            name: imageHelper.getNameFile(res?.FileAttachment),
            status: 'done',
            url: imageHelper.getLinkImageUrl(res?.FileAttachment),
          },
        ]);

      res?.Avatar &&
        setAvatar([
          {
            isFileFormServer: true,
            uid: '1',
            name: imageHelper.getNameFile(res?.Avatar),
            status: 'done',
            url: imageHelper.getLinkImageUrl(res?.Avatar),
          },
        ]);
    } catch (err) {
    } finally {
      setConfirmLoading(false);
    }
  };

  const renderStaticCategoryId = (
    <Select
      placeholder='Ch???n danh m???c'
      style={{ width: '100%' }}
      allowClear={true}
      showSearch
    >
      {dataFilter?.categoryAll.map((x) => (
        <Option value={x.Title} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const onCreate = async (values) => {
    try {
      var formData = new FormData();
      formData.append('JsonString', convertHelper.Serialize(values.JsonString));

      if (values.FileAttachment) {
        formData.append('FileAttachment', values.FileAttachment);
      }

      if (values.Avatar) {
        formData.append('Avatar', values.Avatar);
      }
      setConfirmLoading(true);
      if (isModalOpen?.type === MODAL_TYPE.CREATE) {
        await mediaApi.insertVideo(formData);
        openNotification('T???o m???i video th??nh c??ng');
      } else {
        await mediaApi.updateVideo(isModalOpen?.imageDetail?.Id, formData);
        openNotification('C???p nh???t video th??nh c??ng');
      }

      fetchProductList();

      setIsModalOpen({
        imageDetail: null,
        type: null,
        show: false,
      });

      onCancel();

      fetchProductList();
    } catch (error) {
      if (isModalOpen?.type === MODAL_TYPE.CREATE) {
        openNotification('T???o m???i video th???t b???i', '', NotificationType.ERROR);
      } else {
        openNotification('C???p nh???t video th???t b???i', '', NotificationType.ERROR);
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * Submit form t???o ngu???n tin t???c
   * @param {*} values ?????i t?????ng submit form
   */
  const onFinish = (values) => {
    const { Title, LinkVideo, VideoCategoryId } = values;
    let bodyData = {
      Title,
      LinkVideo,
    };
    if (VideoCategoryId) {
      bodyData.VideoCategoryId = parseInt(
        dataFilter?.categoryAll.find((x) => x.Title === VideoCategoryId)?.Id ??
          undefined
      );
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
            `File th??? ${i + 1} ???? l???n h??n 2MB`,
            '',
            NotificationType.ERROR
          );
          return;
        }
        listFileUpload.push(file);
      }

      body.FileAttachment = listFileUpload?.[0];
    } else if (
      fileListAttachment?.[0]?.isFileFormServer &&
      fileListAttachment.length > 0 &&
      isModalOpen?.type === MODAL_TYPE.EDIT
    ) {
      bodyData = {
        ...bodyData,
        FileAttachment: isModalOpen?.imageDetail?.FileAttachment,
      };
    }

    if (avatar.length > 0 && !avatar?.[0]?.isFileFormServer) {
      let listFileUpload = [];
      for (let i = 0; i < avatar.length; i++) {
        const file = avatar[i].originFileObj;
        if (file.size > LIMIT_UP_LOAD_FILE) {
          openNotification(
            `File th??? ${i + 1} ???? l???n h??n 2MB`,
            '',
            NotificationType.ERROR
          );
          return;
        }
        listFileUpload.push(file);
      }

      body.Avatar = listFileUpload?.[0];
    } else if (
      avatar?.[0]?.isFileFormServer &&
      avatar.length > 0 &&
      isModalOpen?.type === MODAL_TYPE.EDIT
    ) {
      bodyData = {
        ...bodyData,
        Avatar: isModalOpen?.imageDetail?.Avatar,
      };
    }

    body = { ...body, JsonString: bodyData };

    onCreate(body);
  };

  useEffect(() => {
    getDataFilter();
  }, []);

  useEffect(() => {
    fetchProductList();
  }, [objFilter]);

  const getDataFilter = async () => {
    setConfirmLoading(true);
    const res = await mediaApi.getVideoCategoryFilter(filterAll);

    setDataFilter({
      categoryAll: res?.PagedData?.Results ?? [],
    });
    setConfirmLoading(false);
  };

  /**
   * Thay ?????i ph??n trang
   */
  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction
  ) => {
    setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
  };

  /**
   * S??? l?? thay ?????i text search
   * @param {*} textSearch T??? c???n t??m
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  const fetchProductList = async () => {
    try {
      setConfirmLoading(true);
      const response = await mediaApi.getVideoAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results,
        total: response?.PagedData?.RowCount,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />

      {(isModalOpen?.type === MODAL_TYPE.CREATE ||
        isModalOpen?.type === MODAL_TYPE.EDIT) &&
      isModalOpen?.show ? (
        <Modal
          open={true}
          title={
            isModalOpen?.type === MODAL_TYPE.CREATE
              ? 'T???o m???i video'
              : 'Ch???nh s???a video'
          }
          okText={isModalOpen?.type === MODAL_TYPE.CREATE ? 'T???o m???i' : 'L??u'}
          cancelText='Tho??t'
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
              label='Ti??u ?????'
              name='Title'
              rules={[
                {
                  required: true,
                  message: 'Ti??u ????? kh??ng ???????c ????? tr???ng',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label='Danh m???c video' name='VideoCategoryId'>
              {renderStaticCategoryId}
            </Form.Item>

            <Form.Item name='lb-attachment' label='???nh ?????i di???n'>
              <Upload
                listType='picture'
                fileList={avatar}
                onChange={handleChangeAvatar}
                customRequest={commonFunc.dummyRequest}
                multiple={false}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>T???i ???nh l??n</Button>

                {/* {fileListAttachment.length < 1 ? (
                <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>
              ) : null} */}
              </Upload>
            </Form.Item>

            <Form.Item name='LinkVideo' label='Link video'>
              <TextArea
                type='text'
                min={0}
                style={{
                  height: 200,
                }}
              />
            </Form.Item>

            <Form.Item name='lb-attachment' label='File ????nh k??m'>
              <Upload
                listType='picture'
                fileList={fileListAttachment}
                onChange={handleChangeAttachment}
                customRequest={commonFunc.dummyRequest}
                multiple={false}
                maxCount={1}
                accept='.mp4'
              >
                <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>

                {/* {fileListAttachment.length < 1 ? (
                <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>
              ) : null} */}
              </Upload>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='T???o m???i'>
                {isModalOpen?.type === MODAL_TYPE.CREATE ? 'T???o m???i' : 'L??u'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : null}

      <div className={cx('top')}>
        <VideoListPageSearch
          setTextSearch={handleChangeTextSearch}
          onCreate={() =>
            setIsModalOpen({
              imageDetail: null,
              type: MODAL_TYPE.CREATE,
              show: true,
            })
          }
        />
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <VideoListTableData
          setPagination={handleChangePagination}
          data={newsData}
          onEdit={(res) => callApiGetDetailVideo(res?.Id)}
          updateStatusNew={handleUpdateStatusNew}
          deleteCategoryNew={(res) => handleDeleteCategoryNew(res?.Id)}
        />
      </div>
    </div>
  );
}

export default VideoListPage;
