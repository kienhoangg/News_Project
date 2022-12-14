import { FileAddFilled, UploadOutlined, FileOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  TreeSelect,
  Modal,
  Input,
  Row,
  Col,
  Upload,
} from 'antd';
import { TreeNode } from 'antd/lib/tree-select';
import inforStaticAPI from 'apis/inforStaticApi';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import { Direction, NotificationType } from 'common/enum';
import convertHelper from 'helpers/convertHelper';
import { openNotification } from 'helpers/notification';
import { useEffect, useRef, useState } from 'react';
import styles from './StaticCategoryListPage.module.scss';
import StaticCategoryPageSearch from './StaticCategoryPageSearch/StaticCategoryPageSearch';
import StaticCategoryTableData from './StaticCategoryTableData/StaticCategoryTableData';
import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import { TypeUpdate, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import imageHelper from 'helpers/imageHelper';
import { envDomainBackend } from 'common/enviroments';
import Loading from 'components/Loading/Loading';

const cx = classNames.bind(styles);

StaticCategoryListPage.propTypes = {};
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Mode = {
  Create: 1,
  Edit: 0,
};

function StaticCategoryListPage(props) {
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const [dataRoot, setDataRoot] = useState([]);
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: DEFAULT_COLUMN_ORDER_BY,
    keyword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileListAttachment, setFileListAttachment] = useState([]);

  const [form] = Form.useForm();
  const detail = useRef({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const idEdit = useRef();
  const mode = useRef();
  const [confirmLoading, setConfirmLoading] = useState(true);

  /**
   * Thay ?????i b??? l???c th?? g???i l???i danh s??ch
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      // return;
    }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * G???i api l???y d??? li???u danh s??ch lo???i v??n b???n tin
   */
  const fetchCategoryList = async () => {
    try {
      setConfirmLoading(true);
      const response = await inforStaticAPI.getStaticCategoryAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification('L???y lo???i v??n b???n th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
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
      await inforStaticAPI.deleteCategory(id);
      openNotification('X??a danh m???c t??nh th??nh c??ng');
      fetchCategoryList();
    } catch (error) {
      openNotification(
        'X??a danh m???c t??nh th???t b???i',
        '',
        NotificationType.ERROR
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      setConfirmLoading(true);
      await inforStaticAPI.updateStatusCategor({
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
    setIsModalOpen(false);
  };
  const onCreate = async (formData) => {
    try {
      setConfirmLoading(true);
      await inforStaticAPI.insertCategory(formData);
      openNotification('T???o m???i n???i dung t??nh th??nh c??ng');
    } catch (error) {
      openNotification(
        'T???o m???i n???i dung t??nh th???t b???i',
        '',
        NotificationType.ERROR
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const showModal = async () => {
    mode.current = Mode.Create;
    form?.setFieldsValue({});
    await getParentRoot();
    setIsModalOpen(true);
  };

  const getParentRoot = async () => {
    const filterRoot = {
      currentPage: 1,
      pageSize: 9_999_999,
      direction: Direction.DESC,
      orderBy: DEFAULT_COLUMN_ORDER_BY,
      keyword: '',
      parentId: 0,
    };
    setConfirmLoading(true);
    const response = await inforStaticAPI.getStaticCategoryAll(filterRoot);
    setDataRoot(response?.PagedData?.Results ?? []);
    setConfirmLoading(false);
  };

  const renderStaticCategoryId = (
    <Select
      placeholder='Ch???n c???p cha'
      style={{ width: '100%' }}
      allowClear={true}
      showSearch
    >
      {dataRoot.map((x) => (
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
  const onFinish = async (values) => {
    const { Title, Order, ParentId } = values;
    let bodyData = {
      Title,
      Order,
    };
    bodyData.ParentId = parseInt(
      dataRoot?.find((x) => x?.Title === ParentId)?.Id || 0
    );

    let body = { JsonString: bodyData };

    if (
      fileListAttachment.length > 0 &&
      !fileListAttachment?.[0]?.isFileFormServer
    ) {
      const file = fileListAttachment[0].originFileObj;
      if (file.size > LIMIT_UP_LOAD_FILE) {
        openNotification(
          'File ????nh k??m ???? l???n h??n 2MB',
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
        FilePath: files?.[0]?.url?.replaceAll(envDomainBackend, ''),
      };
    }
    body = { ...body, JsonString: bodyData };

    var formData = new FormData();
    formData.append('JsonString', convertHelper.Serialize(body.JsonString));
    if (body.FileAttachment) {
      formData.append('FileAttachment', body.FileAttachment);
    }
    setIsModalOpen(false);
    form.resetFields();
    setFileListAttachment([]);
    if (mode.current === Mode.Create) {
      await onCreate(formData);
    } else {
      await updateSounceNews(formData);
    }
    fetchCategoryList();
  };
  const updateSounceNews = async (values) => {
    try {
      setConfirmLoading(true);
      await inforStaticAPI.updateCategoryByID(idEdit.current, values);
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };
  async function handleShowDetail(Id) {
    const res = await getSourceNewById(Id);
    detail.current = res;
    setIsShowDetail(true);
  }

  async function getSourceNewById(id) {
    try {
      setConfirmLoading(true);
      const res = await inforStaticAPI.getCategoryByID(id);
      return res;
    } catch (err) {
      openNotification(
        'L???y chi ti???t d??? li???u th???t b???i',
        '',
        NotificationType.ERROR
      );
      return null;
    } finally {
      setConfirmLoading(false);
    }
  }

  async function handleUpdate(id) {
    const res = await getSourceNewById(id);
    idEdit.current = id;
    mode.current = Mode.Edit;
    form?.setFieldsValue({
      Title: res?.Title,
      ParentId: dataRoot?.find((x) => x.Id === res?.ParentId)?.Title || null,
      Order: res?.Order,
    });
    if (res?.FilePath) {
      setFileListAttachment([
        {
          isFileFormServer: true,
          uid: '1',
          name: imageHelper.getNameFile(res?.FilePath),
          status: 'done',
          url: imageHelper.getLinkImageUrl(res?.FilePath),
        },
      ]);
    }
    setIsModalOpen(true);
  }

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />
      <Modal
        open={isModalOpen}
        title={
          mode.current === Mode.Edit
            ? 'C???p nh???t danh m???c t??nh'
            : 'T???o m???i danh m???c t??nh'
        }
        okText='Th??m m???i'
        cancelText='Tho??t'
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} {...layout} name='control-hooks' onFinish={onFinish}>
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

          <Form.Item name='Order' label='S??? th??? t???'>
            <Input type='number' min={0} />
          </Form.Item>

          <Form.Item label='Danh m???c' name='ParentId'>
            {renderStaticCategoryId}
          </Form.Item>
          <Form.Item name='lb-attachment' label='T???p ????nh k??m'>
            <Upload
              listType='picture'
              maxCount={1}
              fileList={fileListAttachment}
              onChange={handleChangeAttachment}
              customRequest={commonFunc.dummyRequest}
            >
              {fileListAttachment.length < 1 ? (
                <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>
              ) : null}
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              htmlType={mode.current === Mode.Edit ? 'C???p nh???t' : 'T???o m???i'}
            >
              {mode.current === Mode.Edit ? 'C???p nh???t' : 'T???o m???i'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <StaticCategoryPageSearch setTextSearch={handleChangeTextSearch} />
        <div>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            T???o m???i
          </Button>
        </div>
      </div>
      <Divider style={{ marginBottom: 16 }} />
      <div className={cx('table-data')}>
        <StaticCategoryTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteCategoryNew={handleDeleteCategoryNew}
          updateStatusNew={handleUpdateStatusNew}
          showDetail={handleShowDetail}
          updateData={handleUpdate}
        />
      </div>
      <Modal
        open={isShowDetail}
        title='Hi???n th??? th??ng tin'
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelText='Tho??t'
        onCancel={() => {
          setIsShowDetail(false);
        }}
      >
        <Row gutter={8}>
          <Col span={16}>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Ti??u ?????</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Title}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>S??? th??? t???</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Order}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Danh m???c cha</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.ParentName}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>T???p ????nh k??m</div>
              </Col>
              <Col span={16}>
                {detail.current?.FilePath && (
                  <>
                    <FileOutlined />{' '}
                    {imageHelper.getNameFile(detail.current?.FilePath)}
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default StaticCategoryListPage;
