import {
  Divider,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  TreeSelect,
  Upload,
} from 'antd';
import documentApi from 'apis/documentApi';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './DocumentListPage.module.scss';
import DocumentListPageSearch from './DocumentListPageSearch/DocumentListPageSearch';
import DocumentListTableData from './DocumentListTableData/DocumentListTableData';
import commonFunc from 'common/commonFunc';
import { PlusOutlined, UploadOutlined, FileAddFilled } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';
import { TreeNode } from 'antd/lib/tree-select';
import datetimeHelper from 'helpers/datetimeHelper';
import { openNotification } from 'helpers/notification';
import { NotificationType } from 'common/enum';
import TextArea from 'antd/lib/input/TextArea';
import { CKEditor } from 'ckeditor4-react';
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const dataFilter = {};
const cx = classNames.bind(styles);

DocumentListPage.propTypes = {};

DocumentListPage.defaultProps = {};

function DocumentListPage(props) {
  const [newsData, setNewsData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await documentApi.getDocumentAll(params);
        setNewsData(response);
      } catch (error) {
        console.log('Failed to fetch list: ', error);
      }
    };
    fetchProductList();
  }, []);

  const [form] = Form.useForm();

  function onEditorChange(event) {
    // console.log('data: ', event.editor.getData());
  }

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [fileListAttachment, setFileListAttachment] = useState([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await commonFunc.getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url?.substring(file.url?.lastIndexOf('/') + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const renderFieldNews = (
    <Select placeholder='Lĩnh vực' style={{ width: '100%' }}>
      {dataFilter?.fieldNews?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderSourceNews = (
    <Select placeholder='Nguồn tin' style={{ width: '100%' }}>
      {dataFilter?.sourceNews?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const generateTree = (arrNode) => {
    return arrNode.map((x) => (
      <TreeNode value={x.Id} title={x.CategoryNewsName} key={x.Id}>
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
      {generateTree(commonFunc.list_to_tree(dataFilter?.categoryNews ?? []))}
    </TreeSelect>
  );
  const onCancel = () => {
    setIsModalOpen(false);
  };
  const onCreate = () => {};
  const showModal = () => {
    setIsModalOpen(true);
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
                values?.publishedDate?._d ?? '0001-01-01 00:00:00.0000000';
              const publishedDate = datetimeHelper.formatDatetimeToDate(date);
              const {
                category,
                title,
                IsNewsHot,
                IsNewsVideo,
                IsDisplayTitle,
                IsDisplayAvatar,
                IsComment,
                avatarTitle,
                description,
                content,
                field,
                source,
              } = values;
              const bodyData = {
                Title: title,
                IsHotNews: IsNewsHot,
                IsVideoNews: IsNewsVideo,
                IsShowTitle: IsDisplayTitle,
                IsShowAvatar: IsDisplayAvatar,
                IsShowComment: IsComment,
                AvatarTitle: avatarTitle,
                Description: description,
                Content: content,
                PublishedDate: publishedDate,
              };
              if (field) {
                bodyData.FieldNewsId = parseInt(field);
              }
              if (source) {
                bodyData.SourceNewsId = parseInt(source);
              }
              if (category) {
                bodyData.CategoryNewsId = parseInt(category);
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
          // size={'small'}
          // layout='vertical'
          name='form_in_modal'
          labelCol={{ span: 2 }}
          // wrapperCol={{ span: 21 }}
          initialValues={{
            modifier: 'public',
            IsNewsHot: false,
            IsNewsVideo: false,
            IsDisplayTitle: false,
            IsDisplayAvatar: false,
            IsComment: false,
          }}
        >
          <Form.Item>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  name='title'
                  label='Số ký hiệu'
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
              <Col span={8}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Cơ quan ban hành'
                  name='category'
                >
                  {renderCategoryNews}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Lĩnh vực'
                  name='category'
                >
                  {renderCategoryNews}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Loại văn bản'
                  name='category'
                >
                  {renderCategoryNews}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name='publishedDate'
                  label='Ngày phát hành'
                  style={{ marginBottom: 0 }}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  style={{ marginBottom: 0 }}
                  label='Người ký'
                  name='category'
                >
                  {renderCategoryNews}
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name='description'
            label='Trích yếu'
            style={{ marginBottom: 0 }}
          >
            <TextArea
              showCount
              style={{
                height: 80,
              }}
            />
          </Form.Item>
          <Form.Item name='content' label='Nội dung'>
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
              <Col span={8}>
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
        <DocumentListPageSearch />
        <div>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Tạo mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <DocumentListTableData data={newsData} />
      </div>
    </div>
  );
}

export default DocumentListPage;
