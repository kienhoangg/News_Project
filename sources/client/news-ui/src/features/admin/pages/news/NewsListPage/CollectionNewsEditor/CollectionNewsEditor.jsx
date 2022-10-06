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
import { FileImageFilled, UploadOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { CKEditor } from 'ckeditor4-react';

const cx = classNames.bind(styles);

CollectionNewsEditor.propTypes = {};

CollectionNewsEditor.defaultProps = {};

function CollectionNewsEditor({ open, onCreate, onCancel, action, data }) {
  const [form] = Form.useForm();

  function onEditorChange(event) {
    // console.log('data: ', event.editor.getData());
  }

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
            form.resetFields();
            values.content = values.content?.editor?.getData();
            const {
              category,
              title,
              createdDate,
              IsNewsHot,
              IsNewsVideo,
              IsDisplayTitle,
              IsDisplayAvatar,
              IsComment,
              avatarTitle,
              description,
              content,
              field,
            } = values;
            const bodyData = {
              Title: title,
              PublishedDate: createdDate,
              IsHotNews: IsNewsHot,
              IsVideoNews: IsNewsVideo,
              IsShowTitle: IsDisplayTitle,
              IsShowAvatar: IsDisplayAvatar,
              IsShowComment: IsComment,
              AvatarTitle: avatarTitle,
              Description: description,
              Content: content,
            };
            if (field) {
              bodyData.FieldNews = { Id: parseInt(field) };
            }
            if (category) {
              bodyData.SourceNews = { id: parseInt(category) };
            }
            onCreate(bodyData);
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
            <Col span={4}>
              <Form.Item style={{ marginBottom: 0 }} name='category'>
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
                  <TreeNode value='1' title='Tin tức'>
                    <TreeNode value='1.1' title='Tin trong tỉnh'></TreeNode>
                    <TreeNode value='1.2' title='Chính sách mới' />
                    <TreeNode value='1.3' title='Hoạt động chỉ đạo điều hành' />
                  </TreeNode>
                  <TreeNode value='2' title='Tin tức 2'>
                    <TreeNode value='2.2' title='Chính sách mới 2' />
                    <TreeNode
                      value='2.3'
                      title='Hoạt động chỉ đạo điều hành 2'
                    />
                  </TreeNode>
                </TreeSelect>
              </Form.Item>
            </Col>
            <Col span={14}>
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
                name='createdDate'
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
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                listType='picture'
                maxCount={1}
              >
                <Button type='primary' icon={<FileImageFilled />}>
                  Chọn ảnh đại diện
                </Button>
              </Upload>
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
              <Form.Item name='field'>
                <Select placeholder='Lĩnh vực' style={{ width: '100%' }}>
                  <Option value='1'>Lĩnh vực 1</Option>
                  <Option value='2'>Lĩnh vực 2</Option>
                  <Option value='3'>Lĩnh vực 3</Option>
                  <Option value='4'>Lĩnh vực 4</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name='source' label='Nguồn tin'>
                <Select placeholder='Nguồn tin' style={{ width: '100%' }}>
                  <Option value='1'>Tin số 1</Option>
                  <Option value='2'>Tin số 2</Option>
                  <Option value='3'>Tin số 3</Option>
                  <Option value='4'>Tin số 4</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item name='lb-attachment' label='Tệp đính kèm'>
          <Row gutter={8}>
            <Col span={8}>
              <Upload
                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                listType='picture'
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Tải lên Tệp</Button>
              </Upload>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CollectionNewsEditor;
