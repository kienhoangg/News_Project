import React from 'react';
import PropTypes from 'prop-types';
import {
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
import styles from './CollectionNewsEditor.module.scss';
import classNames from 'classnames/bind';
import { TreeNode } from 'antd/lib/tree-select';
import {
  FileImageFilled,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { CKEditor } from 'ckeditor4-react';
import { useState } from 'react';
import { openNotification } from 'helpers/notification';
import { NotificationType } from 'common/enum';
import datetimeHelper from 'helpers/datetimeHelper';
import { useEffect } from 'react';
import commonFunc from 'common/commonFunc';

const cx = classNames.bind(styles);

CollectionNewsEditor.propTypes = {};

CollectionNewsEditor.defaultProps = {};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess('ok');
  }, 0);
};

const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb

function CollectionNewsEditor({
  open,
  onCreate,
  onCancel,
  action,
  data,
  dataFilter,
}) {
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
      file.preview = await getBase64(file.originFileObj);
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

  return (
    <Modal
      open={open}
      title='Chỉnh sửa tin tức'
      okText='Cập nhật'
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
        <Form.Item label='Danh mục'>
          <Row gutter={8}>
            <Col span={5}>
              <Form.Item style={{ marginBottom: 0 }} name='category'>
                {renderCategoryNews}
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='title'
                label='Tiêu đề'
                rules={[
                  {
                    required: true,
                    message: 'Nhập tiêu đề',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name='publishedDate'
                label='Ngày tạo'
                style={{ marginBottom: 0 }}
              >
                <DatePicker placeholder='Ngày tạo' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label='Tin nổi bật'>
          <Row gutter={8}>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsNewsHot'
                valuePropName='checked'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsNewsVideo'
                valuePropName='checked'
                label={'Tin video'}
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsDisplayTitle'
                valuePropName='checked'
                label='Hiển thị tiêu đề'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsDisplayAvatar'
                valuePropName='checked'
                label='Hình ảnh đại diện'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsComment'
                valuePropName='checked'
                label='Bình luận'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name='lb-avatar' label='Ảnh đại diện'>
          <Row gutter={8}>
            <Col span={8}>
              <Upload
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept='.jpg,.png,.jpeg'
                customRequest={dummyRequest}
              >
                {fileList.length < 1 ? uploadButton : null}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt='example'
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </Col>
            <Col span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='avatarTitle'
                label='Tiêu đề ảnh'
                rules={[
                  {
                    required: true,
                    message: 'Nhập tiêu đề ảnh',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name='description' label='Mô tả' style={{ marginBottom: 0 }}>
          <TextArea
            showCount
            maxLength={256}
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
                { name: 'document', groups: ['mode', 'document', 'doctools'] },
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
        <Form.Item
          name='lb-avatar'
          label='Lĩnh vực'
          style={{ marginBottom: 0 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name='field'>{renderFieldNews}</Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='source' label='Nguồn tin'>
                {renderSourceNews}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name='lb-attachment' label='Tệp đính kèm'>
          <Row gutter={8}>
            <Col span={8}>
              <Upload
                listType='picture'
                maxCount={1}
                fileList={fileListAttachment}
                onChange={handleChangeAttachment}
                customRequest={dummyRequest}
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
  );
}

export default CollectionNewsEditor;
