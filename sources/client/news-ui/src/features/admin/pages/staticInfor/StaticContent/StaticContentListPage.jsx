import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './StaticContentListPage.module.scss';
import StaticContentPageSearch from './StaticContentPageSearch/StaticContentPageSearch';
import {
  Button,
  Divider,
  Form,
  Modal,
  Row,
  Col,
  Input,
  Upload,
  TreeSelect,
} from 'antd';
import { FileAddFilled, UploadOutlined } from '@ant-design/icons';
import StaticContentTableData from './StaticContentTableData/StaticContentTableData';
import { useState } from 'react';
import { Direction, NotificationType } from 'common/enum';
import { useEffect } from 'react';
import inforStaticAPI from 'apis/inforStaticApi';
import { openNotification } from 'helpers/notification';
import datetimeHelper from 'helpers/datetimeHelper';
import convertHelper from 'helpers/convertHelper';
import TextArea from 'antd/lib/input/TextArea';
import { CKEditor } from 'ckeditor4-react';
import commonFunc from 'common/commonFunc';
import { TreeNode } from 'antd/lib/tree-select';

const cx = classNames.bind(styles);

StaticContentListPage.propTypes = {};

const filterAll = {
  currentPage: 1,
  pageSize: 9_999_999,
  direction: Direction.DESC,
  orderBy: 'CreatedDate',
};
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb

function StaticContentListPage(props) {
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
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
  });
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
      return;
    }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * Gọi api lấy dữ liệu danh sách loại văn bản tin
   */
  const fetchCategoryList = async () => {
    try {
      const response = await inforStaticAPI.getContentAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification('Lấy loại văn bản thất bại', '', NotificationType.ERROR);
    }
  };

  const getDataFilter = async () => {
    const responseCategoryAll = inforStaticAPI.getStaticCategoryAll(filterAll);

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
      await inforStaticAPI.deleteContent(id);
      openNotification('Xóa loại văn bản thành công');
      fetchCategoryList();
    } catch (error) {
      openNotification('Xóa loại văn bản thất bại', '', NotificationType.ERROR);
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
      if (values.Avatar) {
        formData.append('Avatar', values.Avatar);
      }
      if (values.FileAttachment) {
        formData.append('FileAttachment', values.FileAttachment);
      }
      setIsModalOpen(false);
      await inforStaticAPI.insertContent(formData);
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
  function onEditorChange(event) {
    // console.log('data: ', event.editor.getData());
  }
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
      placeholder='Chọn loại tin tức'
      allowClear
      treeDefaultExpandAll
      // onChange={onChangeNewsType}
    >
      {generateTree(commonFunc.list_to_tree(dataFilter?.categoryAll ?? []))}
    </TreeSelect>
  );

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <Button icon={<UploadOutlined />}>Tải lên ảnh đại diện</Button>
  );

  return (
    <div className={cx('wrapper')}>
      <Modal
        open={isModalOpen}
        title='Tạo mới nội dung tĩnh'
        okText='Thêm mới'
        cancelText='Thoát'
        onCancel={onCancel}
        width={1300}
        centered
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.content = values.content?.editor?.getData();

              const { Title, Descritpion, StaticCategoryId } = values;
              const bodyData = {
                Title,
                Descritpion,
              };
              if (StaticCategoryId) {
                bodyData.StaticCategoryId = parseInt(StaticCategoryId);
              }

              let body = { JsonString: bodyData };
              if (fileList.length > 0) {
                const file = fileList[0].originFileObj;
                if (file.size > LIMIT_UP_LOAD_FILE) {
                  openNotification(
                    'File ảnh đã lớn hơn 2MB',
                    '',
                    NotificationType.ERROR
                  );
                  return;
                }
                body.Avatar = file;
              }
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
              setFileList([]);
              setFileListAttachment([]);
              onCreate(body);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          name='form_in_modal'
          labelCol={{ span: 2 }}
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item
            label='Tiêu đề'
            name='Title'
            rules={[
              {
                required: true,
                message: 'Số ký hiệu không được để trống',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='Descritpion'
            label='Mô tả'
            style={{ marginBottom: 0 }}
          >
            <TextArea
              showCount
              style={{
                height: 80,
              }}
            />
          </Form.Item>
          <Form.Item name='Content' label='Nội dung'>
            <CKEditor
              initData='<p>Nội dung</p>'
              // onInstanceReady={() => {
              //     alert('Editor is ready!');
              // }}
              onChange={onEditorChange}
              config={{
                language: 'vi',
                toolbarGroups: [
                  {
                    name: 'document',
                    groups: ['mode', 'document', 'doctools'],
                  },
                  { name: 'clipboard', groups: ['clipboard', 'undo'] },
                  {
                    name: 'editing',
                    groups: ['find', 'selection', 'spellchecker', 'editing'],
                  },
                  { name: 'forms', groups: ['forms'] },
                  '/',
                  '/',
                  { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                  {
                    name: 'paragraph',
                    groups: [
                      'list',
                      'indent',
                      'blocks',
                      'align',
                      'bidi',
                      'paragraph',
                    ],
                  },
                  { name: 'links', groups: ['links'] },
                  { name: 'insert', groups: ['insert'] },
                  '/',
                  { name: 'styles', groups: ['styles'] },
                  { name: 'colors', groups: ['colors'] },
                  { name: 'tools', groups: ['tools'] },
                  { name: 'others', groups: ['others'] },
                  { name: 'about', groups: ['about'] },
                ],
                extraPlugins: 'justify,font,colorbutton,forms',
                removeButtons: 'Scayt,HiddenField,CopyFormatting,About',
              }}
            />
          </Form.Item>
          <Form.Item label='Danh mục' name='StaticCategoryId'>
            {renderStaticCategoryId}
          </Form.Item>
          <Form.Item name='lb-avatar' label='Ảnh đại diện'>
            <Row gutter={8} justify={'space-between'}>
              <Col span={8}>
                <Upload
                  listType='picture'
                  maxCount={1}
                  fileList={fileList}
                  // onPreview={handlePreview}
                  onChange={handleChange}
                  accept='.jpg,.png,.jpeg'
                  customRequest={commonFunc.dummyRequest}
                >
                  {fileList.length < 1 ? uploadButton : null}
                </Upload>
              </Col>
              <Col span={8}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name='lb-attachment'
                  label='Tệp đính kèm'
                >
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
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <StaticContentPageSearch setTextSearch={handleChangeTextSearch} />
        <div>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Tạo mới
          </Button>
        </div>
      </div>
      <Divider style={{ marginBottom: 16 }} />
      <div className={cx('table-data')}>
        <StaticContentTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteCategoryNew={handleDeleteCategoryNew}
        />
      </div>
    </div>
  );
}

export default StaticContentListPage;
