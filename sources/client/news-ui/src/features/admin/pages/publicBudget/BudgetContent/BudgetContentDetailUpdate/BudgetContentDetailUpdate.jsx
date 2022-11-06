import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, TreeSelect, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { TreeNode } from 'antd/lib/tree-select';
import budgetPublicAPI from 'apis/budgetPublicApi';
import { CKEditor } from 'ckeditor4-react';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import { DEFAULT_COLUMN_ORDER_BY, Role } from 'common/constant';
import { Direction, NotificationType } from 'common/enum';
import convertHelper from 'helpers/convertHelper';
import imageHelper from 'helpers/imageHelper';
import { openNotification } from 'helpers/notification';
import { useLayoutEffect, useState } from 'react';
import styles from './BudgetContentDetailUpdate.module.scss';

const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb
const cx = classNames.bind(styles);
BudgetContentDetailUpdate.propTypes = {};
function BudgetContentDetailUpdate(props) {
  const [form] = Form.useForm();
  const [documentDetail, setDocumentDetail] = useState({});
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
  });

  const handleChangeAttachment = ({ fileList: newFileList }) => {
    setFileListAttachment(newFileList);
  };

  useLayoutEffect(() => {
    getDataFilter();
  }, []);

  const callApiGetDetail = async (id, categoryAll = []) => {
    try {
      if (!id) return;

      const res = await budgetPublicAPI.getContentById(id);
      setDocumentDetail(res);
      res?.FileAttachment &&
        setFileListAttachment([
          {
            isFileFormServer: true,
            uid: '1',
            name: imageHelper.getNameFile(res?.FileAttachment),
            status: 'done',
            url: imageHelper.getLinkImageUrl(res?.FileAttachment),
          },
        ]);

      form?.setFieldsValue({
        Title: res?.Title,
        Descritpion: res?.Descritpion,
        Content: res?.Content,
        BudgetCategoryId:
          categoryAll.find((x) => x.Id === res?.BudgetCategoryId)?.Title ?? '',
      });
    } catch (error) {
      openNotification('Lấy dữ liệu thất bại', '', NotificationType.ERROR);
      return null;
    }
  };

  const getDataFilter = async () => {
    const filterAll = {
      currentPage: 1,
      pageSize: 9_999_999,
      direction: Direction.DESC,
      orderBy: DEFAULT_COLUMN_ORDER_BY,
    };
    const responseCategoryAll = budgetPublicAPI.getBudgetCategoryAll(filterAll);

    Promise.all([responseCategoryAll]).then((values) => {
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
      });

      callApiGetDetail(props?.Id, values[0]?.PagedData?.Results);
    });
  };

  const onUpdate = async (values) => {
    try {
      var formData = new FormData();
      formData.append('JsonString', convertHelper.Serialize(values.JsonString));

      if (values.FileAttachment) {
        formData.append('FileAttachment', values.FileAttachment);
      }
      await budgetPublicAPI.updateContent(documentDetail?.Id, formData);
      openNotification('Cập nhật thành công');
      props?.onSuccess();
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
  };

  function onEditorChange(event) {
    setDocumentDetail({
      ...documentDetail,
      Content: event.editor.getData(),
    });
  }

  const generateTree = (arrNode) => {
    return arrNode.map((x) => (
      <TreeNode value={x.Title} title={x.Title} key={x.Id}>
        {x.children.length > 0 && generateTree(x.children)}
      </TreeNode>
    ));
  };
  const renderBudgetCategoryId = (
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder='Chọn loại danh mục'
      allowClear
      treeDefaultExpandAll
    >
      {generateTree(commonFunc.list_to_tree(dataFilter?.categoryAll ?? []))}
    </TreeSelect>
  );

  return (
    <div>
      {documentDetail.Id && (
        <Modal
          open={true}
          title='Sửa nội dung công khai'
          okText='Cập nhật'
          cancelText='Thoát'
          onCancel={() => {
            props?.onCancel();
          }}
          width={1300}
          centered
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                const { Title, Descritpion, BudgetCategoryId } = values;
                let bodyData = {
                  Title,
                  Descritpion,
                  content: documentDetail?.Content,
                };
                if (BudgetCategoryId) {
                  bodyData.BudgetCategoryId = parseInt(
                    dataFilter?.categoryAll.find(
                      (x) => x.Title === BudgetCategoryId
                    )?.Id ?? undefined
                  );
                }

                const role = commonFunc.getCookie('role');
                bodyData.Status = role !== Role.ADMIN ? 0 : 1;
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
                  bodyData = {
                    ...bodyData,
                    FileAttachment: documentDetail?.FileAttachment,
                  };
                }
                body = { ...body, JsonString: bodyData };

                form.resetFields();
                setFileList([]);
                setFileListAttachment([]);
                onUpdate(body);
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
                  message: 'Tiêu đề không được để trống',
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
                initData={documentDetail?.Content}
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
                  extraPlugins: 'justify,font,colorbutton,forms,image2',
                  removeButtons: 'Scayt,HiddenField,CopyFormatting,About',
                  allowedContent: true,
                }}
              />
            </Form.Item>
            <Form.Item label='Danh mục' name='BudgetCategoryId'>
              {renderBudgetCategoryId}
            </Form.Item>
            <Form.Item name='lb-attachment' label='Tệp đính kèm'>
              <Row gutter={8} justify={'space-between'}>
                <Col span={8}>
                  <Form.Item style={{ marginBottom: 0 }}>
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
      )}
    </div>
  );
}

export default BudgetContentDetailUpdate;
