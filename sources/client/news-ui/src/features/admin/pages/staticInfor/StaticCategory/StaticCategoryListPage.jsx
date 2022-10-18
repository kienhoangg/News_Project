import { FileAddFilled, UploadOutlined } from '@ant-design/icons';
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
import TextArea from 'antd/lib/input/TextArea';

const cx = classNames.bind(styles);

StaticCategoryListPage.propTypes = {};
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
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

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
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
  const onCreate = async (values) => {
    try {
      var formData = new FormData();
      formData.append('JsonString', convertHelper.Serialize(values.JsonString));
      if (values.FileAttachment) {
        formData.append('FileAttachment', values.FileAttachment);
      }
      setIsModalOpen(false);
      await inforStaticAPI.insertCategory(formData);
      openNotification('Tạo mới nội dung tĩnh thành công');
      fetchCategoryList();
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
    setIsModalOpen(true);
  };
  const generateTree = (arrNode) => {
    return arrNode.map((x) => (
      <TreeNode value={x.Id} title={x.Title} key={x.Id}>
        {x.children.length > 0 && generateTree(x.children)}
      </TreeNode>
    ));
  };
  const renderStaticCategoryId = (
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      // value={valueNewsType}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder='Chọn danh mục cấp cha'
      allowClear
      treeDefaultExpandAll
      // onChange={onChangeNewsType}
    >
      {generateTree(commonFunc.list_to_tree(newsData ?? []))}
    </TreeSelect>
  );

  /**
   * Submit form tạo nguồn tin tức
   * @param {*} values Đối tượng submit form
   */
  const onFinish = (values) => {
    const { Title, Order, ParentId } = values;
    const bodyData = {
      Title,
      Order,
    };
    if (ParentId) {
      bodyData.ParentId = parseInt(ParentId);
    }
    let body = { JsonString: bodyData };

    if (fileListAttachment.length > 0) {
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
    }
    form.resetFields();
    setFileListAttachment([]);
    onCreate(body);
  };

  return (
    <div className={cx('wrapper')}>
      <Modal
        open={isModalOpen}
        title='Tạo mới danh mục tĩnh'
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
            <Button type='primary' htmlType='Tạo mới'>
              Tạo mới
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
        />
      </div>
    </div>
  );
}

export default StaticCategoryListPage;
