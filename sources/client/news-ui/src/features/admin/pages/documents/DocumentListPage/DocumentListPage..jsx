import { FileAddFilled, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TreeSelect,
  Upload,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { TreeNode } from 'antd/lib/tree-select';
import documentApi from 'apis/documentApi';
import { CKEditor } from 'ckeditor4-react';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import { Direction, NotificationType } from 'common/enum';
import convertHelper from 'helpers/convertHelper';
import datetimeHelper from 'helpers/datetimeHelper';
import { openNotification } from 'helpers/notification';
import { useEffect, useRef, useState } from 'react';
import styles from './DocumentListPage.module.scss';
import DocumentListPageSearch from './DocumentListPageSearch/DocumentListPageSearch';
import DocumentListTableData from './DocumentListTableData/DocumentListTableData';
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const cx = classNames.bind(styles);

DocumentListPage.propTypes = {};

DocumentListPage.defaultProps = {};

const filterAll = {
  currentPage: 1,
  pageSize: 9_999_999,
};

function DocumentListPage(props) {
  const [newsData, setNewsData] = useState({});
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });
  const isFirstCall = useRef(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
    sourceAll: [],
    fieldAll: [],
    singerAll: [],
  });
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
      return;
    }
    fetchList();
  }, [objFilter]);

  const fetchList = async () => {
    try {
      const response = await documentApi.getDocumentAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  const getDataFilter = async () => {
    // loại văn bản
    const responseCategoryAll = documentApi.getDocumentCategoryAll(filterAll);
    //Cơ quan ban hành
    const responseSourceAll = documentApi.getDocumentSourceAll(filterAll);
    //Lĩnh vực
    const responseFieldAll = documentApi.getDocumentFieldAll(filterAll);
    // Người ký
    const responseSingerAll = documentApi.getDocumentSingerAll(filterAll);
    Promise.all([
      responseCategoryAll,
      responseSourceAll,
      responseFieldAll,
      responseSingerAll,
    ]).then((values) => {
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
        sourceAll: values[1]?.PagedData?.Results ?? [],
        fieldAll: values[2]?.PagedData?.Results ?? [],
        singerAll: values[3]?.PagedData?.Results ?? [],
      });
    });
  };

  function onEditorChange(event) {
    // console.log('data: ', event.editor.getData());
  }

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const renderFieldNews = (
    <Select placeholder='Lĩnh vực' style={{ width: '100%' }} allowClear={true}>
      {dataFilter?.fieldAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderSourceNews = (
    <Select
      placeholder='Loại văn bản'
      style={{ width: '100%' }}
      allowClear={true}
    >
      {dataFilter?.categoryAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderSingerNews = (
    <Select placeholder='Nguồn tin' style={{ width: '100%' }} allowClear={true}>
      {dataFilter?.singerAll?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const generateTree = (arrNode) => {
    return arrNode.map((x) => (
      <TreeNode value={x.Id} title={x.Title} key={x.Id}>
        {x.children.length > 0 && generateTree(x.children)}
      </TreeNode>
    ));
  };

  const renderCategoryNews = (
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
      {generateTree(commonFunc.list_to_tree(dataFilter?.sourceAll ?? []))}
    </TreeSelect>
  );
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
      await documentApi.insertDocument(formData);
      openNotification('Tạo mới tin thành công');
      fetchList();
    } catch (error) {
      openNotification('Tạo mới tin thất bại', '', NotificationType.ERROR);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
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
      await documentApi.deleteDocument(id);
      openNotification('Xóa nguồn tin thành công');
      fetchList();
    } catch (error) {
      openNotification('Xóa nguồn tin thất bại', '', NotificationType.ERROR);
    }
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  return (
    <div className={cx('wrapper')}>
      <Modal
        open={isModalOpen}
        title='Tạo mới văn bản'
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
              const date =
                values?.PublishedDate?._d ?? '0001-01-01 00:00:00.0000000';
              const publishedDate =
                datetimeHelper.formatDatetimeToDateSerer(date);
              const {
                Code,
                Name,
                DocumentDepartmentId,
                DocumentFieldId,
                DocumentSignPersonId,
                DocumentTypeId,
              } = values;
              const bodyData = {
                Code,
                Name,
                PublishedDate: publishedDate,
              };
              if (DocumentDepartmentId) {
                bodyData.DocumentDepartmentId = parseInt(DocumentDepartmentId);
              }
              if (DocumentFieldId) {
                bodyData.DocumentFieldId = parseInt(DocumentFieldId);
              }
              if (DocumentSignPersonId) {
                bodyData.DocumentSignPersonId = parseInt(DocumentSignPersonId);
              }
              if (DocumentTypeId) {
                bodyData.DocumentTypeId = parseInt(DocumentTypeId);
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
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          // size={'small'}
          // layout='vertical'
          name='form_in_modal'
          labelCol={{ span: 2 }}
          // wrapperCol={{ span: 21 }}
          initialValues={{
            modifier: 'public',
          }}
        >
          <Form.Item label='Số ký hiệu'>
            <Row gutter={8} justify={'space-between'}>
              <Col span={7}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name='Code'
                  rules={[
                    {
                      required: true,
                      message: 'Số ký hiệu không được để trống',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Cơ quan ban hành'
                  name='DocumentDepartmentId'
                >
                  {renderCategoryNews}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Lĩnh vực'
                  name='DocumentFieldId'
                >
                  {renderFieldNews}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item label='Loại văn bản'>
            <Row gutter={8} justify={'space-between'}>
              <Col span={7}>
                <Form.Item style={{ marginBottom: 0 }} name='DocumentTypeId'>
                  {renderSourceNews}
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  name='PublishedDate'
                  label='Ngày phát hành'
                  style={{ marginBottom: 0 }}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Người ký'
                  name='DocumentSignPersonId'
                >
                  {renderSingerNews}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item name='Name' label='Trích yếu' style={{ marginBottom: 0 }}>
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
                // filebrowserBrowseUrl: '/ckfinder/ckfinder.html',
                // filebrowserUploadUrl:
                //   '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
                // filebrowserWindowWidth: '1000',
                // filebrowserWindowHeight: '700',
                // cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
                // cloudServices_tokenUrl: 'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt',
              }}
            />
          </Form.Item>
          <Form.Item name='lb-attachment' label='Tệp đính kèm'>
            <Row gutter={8}>
              <Col span={7}>
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
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <DocumentListPageSearch setTextSearch={handleChangeTextSearch} />
        <div>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Tạo mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <DocumentListTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
        />
      </div>
    </div>
  );
}

export default DocumentListPage;
