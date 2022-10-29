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
import { TypeUpdate } from 'common/constant';
import imageHelper from 'helpers/imageHelper';
import { envDomainBackend } from 'common/enviroments';

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
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileListAttachment, setFileListAttachment] = useState([]);

  const [form] = Form.useForm();
  const detail = useRef({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const idEdit = useRef();
  const mode = useRef();
  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      // return;
    }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * Gọi api lấy dữ liệu danh sách loại văn bản tin
   */
  const fetchCategoryList = async () => {
    try {
      const response = await inforStaticAPI.getStaticCategoryAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification('Lấy loại văn bản thất bại', '', NotificationType.ERROR);
    }
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
      await inforStaticAPI.deleteCategory(id);
      openNotification('Xóa danh mục tĩnh thành công');
      fetchCategoryList();
    } catch (error) {
      openNotification(
        'Xóa danh mục tĩnh thất bại',
        '',
        NotificationType.ERROR
      );
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await inforStaticAPI.updateStatusCategor({
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
    setIsModalOpen(false);
  };
  const onCreate = async (formData) => {
    try {
      await inforStaticAPI.insertCategory(formData);
      openNotification('Tạo mới nội dung tĩnh thành công');
    } catch (error) {
      openNotification(
        'Tạo mới nội dung tĩnh thất bại',
        '',
        NotificationType.ERROR
      );
    }
  };

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const showModal = () => {
    mode.current = Mode.Create;
    setIsModalOpen(true);
  };

  const renderStaticCategoryId = (
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

  /**
   * Submit form tạo nguồn tin tức
   * @param {*} values Đối tượng submit form
   */
  const onFinish = async (values) => {
    const { Title, Order, ParentId } = values;
    let bodyData = {
      Title,
      Order,
    };
    if (ParentId) {
      bodyData.ParentId = parseInt(ParentId);
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
      await inforStaticAPI.updateCategoryByID(idEdit.current, values);
      openNotification('Cập nhật thành công');
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
  };
  async function handleShowDetail(Id) {
    const res = await getSourceNewById(Id);
    detail.current = res;
    setIsShowDetail(true);
  }

  async function getSourceNewById(id) {
    try {
      const res = await inforStaticAPI.getCategoryByID(id);
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
      Title: res?.Title,
      ParentId: res?.ParentId,
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
      <Modal
        open={isModalOpen}
        title={
          mode.current === Mode.Edit
            ? 'Cập nhật danh mục tĩnh'
            : 'Tạo mới danh mục tĩnh'
        }
        okText='Thêm mới'
        cancelText='Thoát'
        onCancel={onCancel}
        footer={null}
      >
        <Form form={form} {...layout} name='control-hooks' onFinish={onFinish}>
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

          <Form.Item name='Order' label='Số thứ tự'>
            <Input type='number' min={0} />
          </Form.Item>

          <Form.Item label='Danh mục' name='ParentId'>
            {renderStaticCategoryId}
          </Form.Item>
          <Form.Item name='lb-attachment' label='Tệp đính kèm'>
            <Upload
              listType='picture'
              maxCount={1}
              fileList={fileListAttachment}
              onChange={handleChangeAttachment}
              customRequest={commonFunc.dummyRequest}
            >
              {fileListAttachment.length < 1 ? (
                <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>
              ) : null}
            </Upload>
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

      <div className={cx('top')}>
        <StaticCategoryPageSearch setTextSearch={handleChangeTextSearch} />
        <div>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Tạo mới
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
        title='Hiển thị thông tin'
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelText='Thoát'
        onCancel={() => {
          setIsShowDetail(false);
        }}
      >
        <Row gutter={8}>
          <Col span={16}>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Tiêu đề</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Title}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Số thứ tự</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Order}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Danh mục cha</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Description}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Tệp đính kèm</div>
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
