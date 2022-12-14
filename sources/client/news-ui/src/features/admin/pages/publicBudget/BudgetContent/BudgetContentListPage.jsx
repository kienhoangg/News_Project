import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BudgetContentListPage.module.scss';
import BudgetContentPageSearch from './BudgetContentPageSearch/BudgetContentPageSearch';
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
import BudgetContentTableData from './BudgetContentTableData/BudgetContentTableData';
import { useState } from 'react';
import { Direction, NotificationType } from 'common/enum';
import { useEffect } from 'react';
import budgetPublicAPI from 'apis/budgetPublicApi';
import { openNotification } from 'helpers/notification';
import datetimeHelper from 'helpers/datetimeHelper';
import convertHelper from 'helpers/convertHelper';
import TextArea from 'antd/lib/input/TextArea';
import { CKEditor } from 'ckeditor4-react';
import commonFunc from 'common/commonFunc';
import { TreeNode } from 'antd/lib/tree-select';
import { TypeUpdate, Role, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import BudgetContentDetail from './BudgetContentDetail/BudgetContentDetail';
import BudgetContentDetailUpdate from './BudgetContentDetailUpdate/BudgetContentDetailUpdate';
import Loading from 'components/Loading/Loading';

const cx = classNames.bind(styles);

BudgetContentListPage.propTypes = {};

const filterAll = {
  currentPage: 1,
  pageSize: 9_999_999,
  direction: Direction.DESC,
  orderBy: DEFAULT_COLUMN_ORDER_BY,
};
const LIMIT_UP_LOAD_FILE = 2_097_152; //2mb

function BudgetContentListPage(props) {
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: DEFAULT_COLUMN_ORDER_BY,
    keyword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataFilter, setDataFilter] = useState({
    categoryAll: [],
  });
  const [fileListAttachment, setFileListAttachment] = useState([]);
  const [fileList, setFileList] = useState([]);
  const dataDetail = useRef({});
  const [openCollectionNewsDetail, setOpenCollectionNewsDetail] =
    useState(false);
  const [popupUpdate, setPopupUpdate] = useState({
    id: null,
    show: false,
  });
  const [form] = Form.useForm();

  const refCategoryAll = useRef([]);
  const [confirmLoading, setConfirmLoading] = useState(true);

  /**
   * Thay ?????i b??? l???c th?? g???i l???i danh s??ch
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      getDataFilter();
      // return;
    }
    fetchCategoryList();
  }, [objFilter]);

  /**
   * G???i api l???y d??? li???u danh s??ch n???i dung t??nh tin
   */
  const fetchCategoryList = async () => {
    try {
      setConfirmLoading(true);
      const response = await budgetPublicAPI.getContentAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification(
        'L???y n???i dung t??nh th???t b???i',
        '',
        NotificationType.ERROR
      );
    } finally {
      setConfirmLoading(false);
    }
  };

  const getDataFilter = async () => {
    setConfirmLoading(true);
    const responseCategoryAll = budgetPublicAPI.getBudgetCategoryAll(filterAll);

    Promise.all([responseCategoryAll]).then((values) => {
      refCategoryAll.current = values[0]?.PagedData?.Results ?? [];
      setDataFilter({
        categoryAll: values[0]?.PagedData?.Results ?? [],
      });
    });
    setConfirmLoading(false);
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

  const handleOnClickShowRowDetail = async (values) => {
    const detailRow = await fetchItem(values);
    if (!detailRow) {
      return;
    }
    dataDetail.current = detailRow;
    setOpenCollectionNewsDetail(true);
  };

  const fetchItem = async (values) => {
    try {
      setConfirmLoading(true);
      return await budgetPublicAPI.getContentById(values?.Id);
    } catch (error) {
      openNotification('L???y d??? li???u th???t b???i', '', NotificationType.ERROR);
      return null;
    } finally {
      setConfirmLoading(false);
    }
  };
  const handleDeleteCategoryNew = async (id) => {
    try {
      setConfirmLoading(true);
      await budgetPublicAPI.deleteContent(id);
      openNotification('X??a n???i dung t??nh th??nh c??ng');
      fetchCategoryList();
    } catch (error) {
      openNotification(
        'X??a n???i dung t??nh th???t b???i',
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
      await budgetPublicAPI.updateStatusContent({
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
  const onCreate = async (values) => {
    try {
      var formData = new FormData();
      formData.append('JsonString', convertHelper.Serialize(values.JsonString));

      if (values.FileAttachment) {
        for (let file of values.FileAttachment) {
          formData.append('FileAttachment', file);
        }
      }
      setIsModalOpen(false);
      await budgetPublicAPI.insertContent(formData);
      openNotification('T???o m???i n???i dung t??nh th??nh c??ng');
      fetchCategoryList();
    } catch (error) {
      openNotification(
        'T???o m???i n???i dung t??nh th???t b???i',
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
      // value={valueNewsType}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder='Ch???n lo???i danh m???c'
      allowClear
      treeDefaultExpandAll
      // onChange={onChangeNewsType}
    >
      {generateTree(commonFunc.list_to_tree(dataFilter?.categoryAll ?? []))}
    </TreeSelect>
  );

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />
      <Modal
        open={isModalOpen}
        title='T???o m???i n???i dung t??nh'
        okText='Th??m m???i'
        cancelText='Tho??t'
        onCancel={onCancel}
        width={1300}
        centered
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              values.content = values.Content?.editor?.getData();
              const {
                Title,
                Description,
                publicInformationCategoryId,
                content,
              } = values;
              const bodyData = {
                Title,
                Description,
                content,
                publicInformationCategoryId,
              };
              if (publicInformationCategoryId) {
                bodyData.publicInformationCategoryId = parseInt(
                  dataFilter?.categoryAll.find(
                    (x) => x.Title === publicInformationCategoryId
                  )?.Id ?? undefined
                );
              }

              const role = commonFunc.getCookie('role');
              bodyData.Status = role !== Role.ADMIN ? 0 : 1;
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
              let listFileUpload = [];
              for (let i = 0; i < fileListAttachment.length; i++) {
                const file = fileListAttachment[i].originFileObj;
                if (file.size > LIMIT_UP_LOAD_FILE) {
                  openNotification(
                    `File th??? ${i + 1} ???? l???n h??n 2MB`,
                    '',
                    NotificationType.ERROR
                  );
                  return;
                }
                listFileUpload.push(file);
              }
              body.FileAttachment = listFileUpload;
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
            label='Ti??u ?????'
            name='Title'
            rules={[
              {
                required: true,
                message: 'S??? k?? hi???u kh??ng ???????c ????? tr???ng',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='Description'
            label='M?? t???'
            style={{ marginBottom: 0 }}
          >
            <TextArea
              showCount
              style={{
                height: 80,
              }}
            />
          </Form.Item>
          <Form.Item name='Content' label='N???i dung'>
            <CKEditor
              initData='<p>N???i dung</p>'
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
                extraPlugins: 'justify,font,colorbutton,forms,image2',
                removeButtons: 'Scayt,HiddenField,CopyFormatting,About',
                allowedContent: true,
              }}
            />
          </Form.Item>
          <Form.Item label='Danh m???c' name='publicInformationCategoryId'>
            {renderBudgetCategoryId}
          </Form.Item>
          <Form.Item name='lb-attachment' label='T???p ????nh k??m'>
            <Row gutter={8} justify={'space-between'}>
              <Col span={8}>
                <Form.Item style={{ marginBottom: 0 }}>
                  <Upload
                    listType='picture'
                    defaultFileList={fileListAttachment}
                    onChange={handleChangeAttachment}
                    customRequest={commonFunc.dummyRequest}
                    multiple={true}
                    maxCount={100}
                  >
                    <Button icon={<UploadOutlined />}>T???i l??n T???p</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <BudgetContentPageSearch setTextSearch={handleChangeTextSearch} />
        <div>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            T???o m???i
          </Button>
        </div>
      </div>
      <Divider style={{ marginBottom: 16 }} />
      <div className={cx('table-data')}>
        <BudgetContentTableData
          data={newsData}
          onClickShowRowDetail={handleOnClickShowRowDetail}
          setPagination={handleChangePagination}
          deleteCategoryNew={handleDeleteCategoryNew}
          updateStatusNew={handleUpdateStatusNew}
          onClickEdit={(id) => {
            setPopupUpdate({
              id: id,
              show: true,
            });
          }}
        />

        <BudgetContentDetail
          categoryAll={refCategoryAll.current}
          data={dataDetail.current}
          open={openCollectionNewsDetail}
          onCancel={() => {
            setOpenCollectionNewsDetail(false);
          }}
        />

        {(popupUpdate?.id || popupUpdate?.id === 0) && popupUpdate?.show ? (
          <BudgetContentDetailUpdate
            onSuccess={() => {
              setPopupUpdate({
                id: null,
                show: false,
              });
              fetchCategoryList();
            }}
            Id={popupUpdate?.id}
            onCancel={() => {
              setPopupUpdate({
                id: null,
                show: false,
              });
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default BudgetContentListPage;
