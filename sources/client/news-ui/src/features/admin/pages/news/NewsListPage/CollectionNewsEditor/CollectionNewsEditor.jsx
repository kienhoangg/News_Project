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
import moment from 'moment';

const cx = classNames.bind(styles);

CollectionNewsEditor.propTypes = {};

CollectionNewsEditor.defaultProps = {};

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
    <Button icon={<UploadOutlined />}>T???i l??n ???nh ?????i di???n</Button>
  );

  const renderFieldNews = (
    <Select
      placeholder='L??nh v???c'
      style={{ width: '100%' }}
      showSearch
      allowClear
    >
      {dataFilter?.fieldNews?.map((x) => (
        <Option value={x.Title} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderSourceNews = (
    <Select
      placeholder='Ngu???n tin'
      style={{ width: '100%' }}
      showSearch
      allowClear
    >
      {dataFilter?.sourceNews?.map((x) => (
        <Option value={x.Title} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  const renderCollaborators = (
    <Select
      placeholder='T??c gi???'
      style={{ width: '100%' }}
      showSearch
      allowClear
    >
      {dataFilter?.collaborators?.map((x) => (
        <Option value={x.Name} key={x.Id}>
          {x.Name}
        </Option>
      ))}
    </Select>
  );

  const generateTree = (arrNode) => {
    return arrNode.map((x) => (
      <TreeNode
        value={x.CategoryNewsName}
        title={x.CategoryNewsName}
        key={x.Id}
      >
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
      placeholder='Ch???n lo???i tin t???c'
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
      title='T???o m???i tin t???c'
      okText='T???o m???i'
      cancelText='Tho??t'
      onCancel={onCancel}
      width={1300}
      centered
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            values.content = values.content?.editor?.getData();
            const date = values?.publishedDate?._d ?? new Date();
            const publishedDate =
              datetimeHelper.formatDatetimeToDateSerer(date);
            const {
              collaboratorId,
              category,
              title,
              IsDocumentNews,
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
              IsDocumentNews: IsDocumentNews,
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
              bodyData.FieldNewsId =
                dataFilter?.fieldNews.find((x) => x.Title === field)?.Id ??
                undefined;
            }
            if (source) {
              bodyData.SourceNewsId =
                dataFilter?.sourceNews.find((x) => x?.Title === source)?.Id ??
                undefined;
            }
            if (category) {
              bodyData.CategoryNewsId =
                dataFilter?.categoryNews.find(
                  (x) => x?.CategoryNewsName === category
                )?.Id ?? undefined;
            }
            if (collaboratorId) {
              bodyData.CollaboratorId =
                dataFilter?.collaborators.find(
                  (x) => x?.Name === collaboratorId
                )?.Id ?? undefined;
            }
            let body = { JsonString: bodyData };
            if (fileList.length > 0) {
              const file = fileList[0].originFileObj;
              if (file.size > LIMIT_UP_LOAD_FILE) {
                openNotification(
                  'File ???nh ???? l???n h??n 2MB',
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
                  'File ????nh k??m ???? l???n h??n 2MB',
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
          IsDocumentNews: false,
          IsNewsHot: false,
          IsNewsVideo: false,
          IsDisplayTitle: false,
          IsDisplayAvatar: false,
          IsComment: false,
        }}
      >
        <Form.Item label='Danh m???c'>
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
                label='Ti??u ?????'
                rules={[
                  {
                    required: true,
                    message: 'Nh???p ti??u ?????',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name='publishedDate'
                label='Ng??y t???o'
                style={{ marginBottom: 0 }}
              >
                <DatePicker
                  placeholder='Ng??y t???o'
                  style={{ width: '100%' }}
                  defaultValue={moment()}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label='Tin n???i b???t'>
          <Row gutter={8}>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsDocumentNews'
                valuePropName='checked'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            {/* <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsNewsHot'
                valuePropName='checked'
                label={'Tin n???i b???t'}
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
                label='Hi???n th??? ti??u ?????'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsDisplayAvatar'
                valuePropName='checked'
                label='H??nh ???nh ?????i di???n'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='IsComment'
                valuePropName='checked'
                label='B??nh lu???n'
              >
                <Checkbox></Checkbox>
              </Form.Item>
            </Col> */}
          </Row>
        </Form.Item>

        <Form.Item name='lb-avatar' label='???nh ?????i di???n'>
          <Row gutter={8}>
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
              {/* <Modal
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
              </Modal> */}
            </Col>
            <Col span={16}>
              <Form.Item
                style={{ marginBottom: 0 }}
                name='avatarTitle'
                label='Ti??u ????? ???nh'
                rules={[
                  {
                    required: true,
                    message: 'Nh???p ti??u ????? ???nh',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item name='description' label='M?? t???' style={{ marginBottom: 0 }}>
          <TextArea
            showCount
            maxLength={2000}
            style={{
              height: 80,
            }}
          />
        </Form.Item>
        <Form.Item name='content' label='N???i dung'>
          <CKEditor
            initData='<p>N???i dung</p>'
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
              extraPlugins: 'justify,font,colorbutton,forms,image2',
              removeButtons: 'Scayt,HiddenField,CopyFormatting,About',
              allowedContent: true,
            }}
          />
        </Form.Item>
        <Form.Item
          name='lb-avatar'
          label='L??nh v???c'
          style={{ marginBottom: 0 }}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item name='field'>{renderFieldNews}</Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='source' label='Ngu???n tin'>
                {renderSourceNews}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='collaboratorId' label='T??c gi???'>
                {renderCollaborators}
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name='lb-attachment' label='T???p ????nh k??m'>
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
                  <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>
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
