import documentApi from 'apis/documentApi';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import styles from './DocumentSignerPage.module.scss';
import DocumentSignerPageSearch from './DocumentSignerPageSearch/DocumentSignerPageSearch';
import DocumentSignerTableData from './DocumentSignerTableData/DocumentSignerTableData';
import { Direction, NotificationType } from 'common/enum';
import { Divider, Form, Button, Input, Modal, Select } from 'antd';
import { openNotification } from 'helpers/notification';
import { Option } from 'antd/lib/mentions';
import { FileAddFilled } from '@ant-design/icons';
import { TypeUpdate, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import Loading from 'components/Loading/Loading';
const { TextArea } = Input;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

DocumentSignerPage.propTypes = {};

DocumentSignerPage.defaultProps = {};

function DocumentSignerPage(props) {
  const MODAL_TYPE = {
    EDIT: 0,
    DETAIL: 1,
  };
  const [document, setDocument] = useState({
    content: null,
    type: null,
  });

  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const [dataRoot, setDataRoot] = useState([]);
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: DEFAULT_COLUMN_ORDER_BY,
    keyword: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(true);

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      // return;
    }
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      setConfirmLoading(true);
      const response = await documentApi.getDocumentSingerAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      openNotification('L???y  ng?????i k?? th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const showModal = async () => {
    await getParentRoot();
    setIsModalOpen(true);
  };

  const getParentRoot = async () => {
    const filterRoot = {
      currentPage: 1,
      pageSize: 9_999_999,
      direction: Direction.DESC,
      orderBy: DEFAULT_COLUMN_ORDER_BY,
      keyword: '',
      parentId: 0,
    };
    setConfirmLoading(true);
    const response = await documentApi.getDocumentSingerAll(filterRoot);
    setDataRoot(response?.PagedData?.Results ?? []);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
    setDocument({
      content: null,
      type: null,
    });
  };

  /**
   * Submit form t???o ngu???n tin t???c
   * @param {*} values ?????i t?????ng submit form
   */
  const onFinish = (values) => {
    let parentID = null;
    if (values.parentId) {
      parentID = parseInt(
        dataRoot.find((x) => x.Title === values.parentId)?.Id ?? '0'
      );
    }
    values = {
      Title: values?.title,
      Order: parseInt(values?.order ?? 0),
      Description: values?.description,
    };

    values.ParentId = parentID || 0;

    if (document?.type === MODAL_TYPE.EDIT) updateCategoryNews(values);
    else insertCategoryNews(values);

    form.resetFields();
  };

  /**
   * G???i api l???y d??? li???u danh s??ch ngu???i tin t???c
   */
  const updateCategoryNews = async (values) => {
    try {
      setConfirmLoading(true);
      await documentApi.updateSingerDocument(document?.content?.Id, values);
      handleCancel();
      fetchProductList();
      openNotification('S???a th??nh c??ng');
    } catch (error) {
      openNotification('S???a th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * G???i api l???y d??? li???u danh s??ch ngu???i tin t???c
   */
  const insertCategoryNews = async (values) => {
    try {
      setConfirmLoading(true);
      await documentApi.insertSingerDocument(values);
      handleCancel();
      fetchProductList();
      openNotification('T???o m???i ng?????i k?? th??nh c??ng');
    } catch (error) {
      openNotification('T???o m???i ng?????i k?? th???t b???i', '', NotificationType.ERROR);
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

  const handleDeleteSourceNew = async (id) => {
    try {
      setConfirmLoading(true);
      await documentApi.deleteSingerDocument(id);
      openNotification('X??a ng?????i k?? th??nh c??ng');
      fetchProductList();
    } catch (error) {
      openNotification('X??a ng?????i k?? th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      setConfirmLoading(true);
      await documentApi.updatStatusSingerDocument({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const renderOption = (
    <Select
      placeholder='Ch???n c???p cha'
      style={{ width: '100%' }}
      allowClear={true}
      showSearch
    >
      {dataRoot.map((x) => (
        <Option value={x.Title} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />

      {
        //#region popup th??m m???i
      }
      <Modal
        className={cx('modal-category-news')}
        title={
          document?.type === MODAL_TYPE.DETAIL
            ? 'Xem chi ti???t'
            : document?.type === MODAL_TYPE.EDIT
            ? 'Ch???nh s???a'
            : 'Th??m m???i lo???i v??n b???n tin'
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
          <Form.Item
            name='title'
            label='Ti??u ?????'
            rules={[{ required: true, message: 'Ti??u ????? kh??ng ???????c ????? tr???ng' }]}
          >
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>{document?.content?.Title}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item name='parentId' label='Danh m???c c???p cha'>
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>
                {
                  newsData?.data?.find(
                    (item) => item?.Id === document?.content?.ParentId
                  )?.Title
                }
              </div>
            ) : (
              renderOption
            )}
          </Form.Item>
          <Form.Item name='order' label='S??? th??? t???'>
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>{document?.content?.Order}</div>
            ) : (
              <Input type='number' min={0} defaultValue={0} />
            )}
          </Form.Item>
          <Form.Item name='description' label='M?? t???'>
            {document?.type === MODAL_TYPE.DETAIL ? (
              <div>{document?.content?.Description}</div>
            ) : (
              <TextArea />
            )}
          </Form.Item>

          {document?.type === MODAL_TYPE.DETAIL ? null : (
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button
                type='primary'
                htmlType={
                  document?.type === MODAL_TYPE.EDIT ? 'L??u' : 'T???o m???i'
                }
              >
                {document?.type === MODAL_TYPE.EDIT ? 'L??u' : 'T???o m???i'}
              </Button>
            </Form.Item>
          )}
        </Form>
      </Modal>
      {
        //#endregion
      }
      <div className={cx('top')}>
        <DocumentSignerPageSearch setTextSearch={handleChangeTextSearch} />

        <div className={cx('btn-add-signer-document')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Th??m m???i
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <DocumentSignerTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
          updateStatusNew={handleUpdateStatusNew}
          onEdit={(res) => {
            showModal();
            setDocument({
              content: res,
              type: MODAL_TYPE.EDIT,
            });
            form.setFieldsValue({
              title: res?.Title,
              parentId:
                dataRoot?.find((item) => item?.Id === res?.ParentId)?.Title ||
                null,
              order: res?.Order,
              description: res?.Description,
            });
          }}
          onClickRow={(res) => {
            showModal();
            setDocument({
              content: res,
              type: MODAL_TYPE.DETAIL,
            });
          }}
        />
      </div>
    </div>
  );
}

export default DocumentSignerPage;
