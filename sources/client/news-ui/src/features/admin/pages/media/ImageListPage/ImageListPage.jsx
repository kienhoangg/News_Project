import { Divider, Form, Input, Select, Modal, Upload, Tooltip } from 'antd';
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
import { CopyOutlined, FileAddFilled, UploadOutlined } from '@ant-design/icons';
import commonFunc from 'common/commonFunc';
import convertHelper from 'helpers/convertHelper';
import { TypeUpdate, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import { envDomainBackend } from 'common/enviroments';
import imageHelper from 'helpers/imageHelper';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Loading from 'components/Loading/Loading';

const cx = classNames.bind(styles);
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb

ImageListPage.propTypes = {};

ImageListPage.defaultProps = {};

function ImageListPage(props) {
  const filterAll = {
    currentPage: 1,
    pageSize: 9_999_999,
    direction: Direction.DESC,
    orderBy: DEFAULT_COLUMN_ORDER_BY,
  };
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
    orderBy: DEFAULT_COLUMN_ORDER_BY,
    keyword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState({
    imageDetail: null,
    type: null,
    show: false,
  });
  const [form] = Form.useForm();
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(true);

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const urlLinkResponve = useRef('');

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
      // return;
    }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * G???i API l???y chi ti???t
   */
  const callApiGetDetailImage = async (id) => {
    if (!id && id !== 0) return;
    try {
      setConfirmLoading(true);
      const res = await mediaApi.getDetailImage(id);
      setIsModalOpen({
        imageDetail: res,
        type: MODAL_TYPE.EDIT,
        show: true,
      });
      form.setFieldsValue({
        Title: res?.Title,
        PhotoCategoryId:
          dataFilter?.categoryAll.find((x) => x.Id === res?.PhotoCategoryId)
            ?.Title ?? '',
        Order: res?.Order,
      });

      if (res?.ImagePath) {
        urlLinkResponve.current = res?.ImagePath;
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
    } catch (err) {
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * G???i api l???y d??? li???u danh s??ch lo???i v??n b???n tin
   */
  const fetchCategoryList = async () => {
    try {
      setConfirmLoading(true);
      const response = await mediaApi.getImageAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification(
        'L???y danh s??ch h??nh ???nh th???t b???i',
        '',
        NotificationType.ERROR
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const getDataFilter = async () => {
    setConfirmLoading(true);
    const responseCategoryAll = mediaApi.getImageCategoryAll(filterAll);

    Promise.all([responseCategoryAll]).then((values) => {
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
      });
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

  const handleDeleteCategoryNew = async (id) => {
    try {
      setConfirmLoading(true);
      await mediaApi.deleteImage(id);
      openNotification('X??a h??nh ???nh th??nh c??ng');
      fetchCategoryList();
    } catch (error) {
      openNotification('X??a h??nh ???nh th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      setConfirmLoading(true);
      await mediaApi.updateStatusImage({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchCategoryList();
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * S??? l?? thay ?????i text search
   * @param {*} textSearch T??? c???n t??m
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
      setConfirmLoading(true);
      if (isModalOpen?.type === MODAL_TYPE.CREATE) {
        await mediaApi.insertImage(formData);
        openNotification('T???o m???i h??nh ???nh th??nh c??ng');
      } else {
        await mediaApi.updateImage(isModalOpen?.imageDetail?.Id, formData);
        openNotification('C???p nh???t h??nh ???nh th??nh c??ng');
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
          'T???o m???i h??nh ???nh th???t b???i',
          '',
          NotificationType.ERROR
        );
      } else {
        openNotification(
          'C???p nh???t h??nh ???nh th???t b???i',
          '',
          NotificationType.ERROR
        );
      }
    } finally {
      setConfirmLoading(false);
    }
  };

  const MODAL_TYPE = {
    EDIT: 0,
    CREATE: 1,
    DETAIL: 2,
  };

  const renderStaticCategoryId = (
    <Select
      placeholder='Ch???n c???p cha'
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

  /**
   * Submit form t???o ngu???n tin t???c
   * @param {*} values ?????i t?????ng submit form
   */
  const onFinish = (values) => {
    const { Title, Order, PhotoCategoryId } = values;
    let bodyData = {
      Title,
      Order,
    };
    if (PhotoCategoryId) {
      bodyData.PhotoCategoryId = parseInt(
        dataFilter?.categoryAll.find((x) => x.Title === PhotoCategoryId)?.Id ??
          undefined
      );
    }
    let body = { JsonString: bodyData };

    const _fileListAttachment = [...fileListAttachment];
    let fileUploadCurrent = [];
    let urlPath = '';
    for (let file of _fileListAttachment) {
      if (file?.isFileFormServer) {
        urlPath += `${file.url.replaceAll(envDomainBackend, '')};;`;
        continue;
      }
      fileUploadCurrent.push(file);
    }
    let listFileUpload = [];
    for (let i = 0; i < fileUploadCurrent.length; i++) {
      const file = fileUploadCurrent[i].originFileObj;
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

    body.FileAttachment = listFileUpload;

    if (urlPath.length > 0 && isModalOpen?.type === MODAL_TYPE.EDIT) {
      bodyData = {
        ...bodyData,
        ImagePath: urlPath.substring(0, urlPath.length - 2), // -2 d???u ;; ??? cu???i
      };
    }
    body = { ...body, JsonString: bodyData };

    onCreate(body);
  };

  /**
   * C???p nh???t h??nh ???nh
   */

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />

      {(isModalOpen?.type === MODAL_TYPE.CREATE ||
        isModalOpen?.type === MODAL_TYPE.EDIT ||
        isModalOpen?.type === MODAL_TYPE.DETAIL) &&
      isModalOpen?.show ? (
        <Modal
          open={true}
          title={
            isModalOpen?.type === MODAL_TYPE.CREATE
              ? 'T???o m???i h??nh ???nh'
              : isModalOpen?.type === MODAL_TYPE.DETAIL
              ? 'Chi ti???t'
              : 'Ch???nh s???a h??nh ???nh'
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
              {isModalOpen?.type === MODAL_TYPE.DETAIL ? (
                <div>{isModalOpen?.imageDetail?.Title}</div>
              ) : (
                <Input />
              )}
            </Form.Item>

            <Form.Item label='Danh m???c h??nh ???nh' name='PhotoCategoryId'>
              {isModalOpen?.type === MODAL_TYPE.DETAIL ? (
                <div>
                  {
                    dataFilter?.categoryAll?.find(
                      (item) =>
                        item?.Id === isModalOpen?.imageDetail?.PhotoCategoryId
                    )?.Title
                  }
                </div>
              ) : (
                renderStaticCategoryId
              )}
            </Form.Item>

            <Form.Item name='Order' label='S??? th??? t???'>
              {isModalOpen?.type === MODAL_TYPE.DETAIL ? (
                <div>{isModalOpen?.imageDetail?.Order}</div>
              ) : (
                <Input type='number' min={0} />
              )}
            </Form.Item>

            <Form.Item name='lb-attachment' label='T???p ????nh k??m'>
              {isModalOpen?.type === MODAL_TYPE.DETAIL ? (
                <div>
                  {isModalOpen?.imageDetail?.ImagePath?.split(';;').map(
                    (item) => {
                      return (
                        <div
                          href=''
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 100,
                              height: 50,
                            }}
                          >
                            <img
                              alt={imageHelper.getNameFile(item)}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                              src={imageHelper.getLinkImageUrl(item)}
                            />
                          </div>
                          <a
                            href={imageHelper.getLinkImageUrl(item)}
                            style={{ marginLeft: 4 }}
                            target='_blank'
                          >
                            {imageHelper.getNameFile(item)}
                          </a>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <Upload
                  listType='picture'
                  defaultFileList={fileListAttachment}
                  onChange={handleChangeAttachment}
                  customRequest={commonFunc.dummyRequest}
                  multiple={true}
                  maxCount={100}
                >
                  <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>
                </Upload>
              )}
            </Form.Item>

            {isModalOpen?.type === MODAL_TYPE.DETAIL && (
              <Form.Item name='linkImage' label='???????ng d???n ???nh'>
                {Array.isArray(
                  isModalOpen?.imageDetail?.ImagePath?.split(';;')
                ) &&
                  isModalOpen?.imageDetail?.ImagePath?.split(';;').map(
                    (item, index) => {
                      return (
                        <Input.Group compact key={index}>
                          <Input
                            defaultValue={imageHelper.getLinkImageUrl(item)}
                            style={{
                              width: 'calc(100% - 50px)',
                            }}
                          />
                          <CopyToClipboard
                            text={imageHelper.getLinkImageUrl(item)}
                          >
                            <Tooltip title='Copy ???????ng d???n'>
                              <Button icon={<CopyOutlined />} />
                            </Tooltip>
                          </CopyToClipboard>
                        </Input.Group>
                      );
                    }
                  )}
              </Form.Item>
            )}

            {isModalOpen?.type === MODAL_TYPE.DETAIL ? null : (
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='T???o m???i'>
                  {isModalOpen?.type === MODAL_TYPE.CREATE ? 'T???o m???i' : 'L??u'}
                </Button>
              </Form.Item>
            )}
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
            T???o m???i
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
          onClickRow={(res) => {
            setIsModalOpen({
              imageDetail: res,
              type: MODAL_TYPE.DETAIL,
              show: true,
            });
          }}
        />
      </div>
    </div>
  );
}

export default ImageListPage;
