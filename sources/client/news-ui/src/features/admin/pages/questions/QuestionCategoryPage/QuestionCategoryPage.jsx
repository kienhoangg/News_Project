import { Button, Col, Divider, Form, Input, Modal, Row, Select } from 'antd';
import documentApi from 'apis/documentApi';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './QuestionCategoryPage.module.scss';
import QuestionCategoryPageSearch from './QuestionCategoryPageSearch/QuestionCategoryPageSearch';
import questionApi from 'apis/questionApi';
import QuestionCategoryTableData from './QuestionCategoryTableData/QuestionCategoryTableData';
import { Direction, NotificationType } from 'common/enum';
import stringHelper from 'helpers/stringHelper';
import TextArea from 'antd/lib/input/TextArea';
import { Option } from 'antd/lib/mentions';
import { openNotification } from 'helpers/notification';
import { TypeUpdate, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import datetimeHelper from 'helpers/datetimeHelper';
import Loading from 'components/Loading/Loading';

const cx = classNames.bind(styles);

QuestionCategoryPage.propTypes = {};

QuestionCategoryPage.defaultProps = {};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const Mode = {
  Create: 1,
  Edit: 0,
};

function QuestionCategoryPage(props) {
  const [newsData, setNewsData] = useState({});
  const [parentData, setParentData] = useState([]);

  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: DEFAULT_COLUMN_ORDER_BY,
    keyword: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const mode = useRef();
  const idEdit = useRef();

  const [isShowDetail, setIsShowDetail] = useState(false);
  const detail = useRef({});
  const [confirmLoading, setConfirmLoading] = useState(true);

  const fetchList = async () => {
    try {
      setConfirmLoading(true);
      const response = await questionApi.getCategoryFilter(objFilter);
      setNewsData(response?.PagedData);
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const fetchProductListAll = async () => {
    try {
      setConfirmLoading(true);
      const response = await questionApi.getCategoryFilter({
        currentPage: 1,
        pageSize: 9_999_999,
        parentId: 0,
      });
      setParentData(response?.PagedData?.Results);
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    } finally {
      setConfirmLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [objFilter]);

  function handleChangeSearch(text) {
    let newFilter = { ...objFilter, keyword: text };
    console.log('newFilter', newFilter);
    setObjFilter(newFilter);
  }

  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction
  ) => {
    setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
  };

  // MODEL t???o m???i
  const renderOptionParentData = (
    <Select
      placeholder='Ch???n c???p cha'
      style={{ width: '100%' }}
      allowClear={true}
      showSearch
    >
      {Array.isArray(parentData) &&
        parentData.map((x) => (
          <Option value={x.Title} key={x.Id}>
            {x.Title}
          </Option>
        ))}
    </Select>
  );

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    values.parentId =
      parentData.find((x) => x?.Title === values?.parentId)?.Id || 0;

    setIsModalOpen(false);
    if (mode.current === Mode.Create) {
      await insertCategory(values);
    } else {
      await updateQuestionCategory(values);
    }
    form.resetFields();
    fetchList();
  };

  const insertCategory = async (values) => {
    try {
      setConfirmLoading(true);
      await questionApi.insertQuestionCategory(values);
      openNotification('T???o m???i th??nh c??ng');
    } catch (error) {
      openNotification('T???o m???i th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const updateQuestionCategory = async (values) => {
    try {
      setConfirmLoading(true);
      await questionApi.updateQuestionCategory(idEdit.current, values);
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  //Update
  const handleUpdateStatus = async (values) => {
    try {
      setConfirmLoading(true);
      await questionApi.updateStatusQuestionCategory({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchList();
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  async function handleDelete(values) {
    try {
      setConfirmLoading(true);
      await questionApi.deleteStatusQuestionCategory(values?.Id);
      openNotification('X??a th??nh c??ng');
      fetchList();
    } catch (error) {
      openNotification('X??a th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  }

  async function handleUpdate(id) {
    const res = await getQuestionCategoryByID(id);
    idEdit.current = id;
    mode.current = Mode.Edit;

    await fetchProductListAll();
    let valuesForm = {
      title: res?.Title,
      description: res?.Description,
      order: res?.Order,
    };
    if (res?.ParentId) {
      valuesForm.parentId = parentData.find(
        (x) => x.Id === res.ParentId
      )?.Title;
    }
    form?.setFieldsValue(valuesForm);
    setIsModalOpen(true);
  }

  async function getQuestionCategoryByID(id) {
    try {
      setConfirmLoading(true);
      const res = await questionApi.getQuestionCategoryByID(id);
      return res;
    } catch (err) {
      openNotification(
        'L???y chi ti???t d??? li???u th???t b???i',
        '',
        NotificationType.ERROR
      );
      return null;
    } finally {
      setConfirmLoading(false);
    }
  }

  async function handleShowDetail(Id) {
    const res = await getQuestionCategoryByID(Id);
    detail.current = res;
    setIsShowDetail(true);
  }

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />

      <div className={cx('top')}>
        <QuestionCategoryPageSearch
          setTextSearch={handleChangeSearch}
          handleOnClickCreate={async () => {
            mode.current = Mode.Create;
            await fetchProductListAll();
            setIsModalOpen(true);
          }}
        />
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <QuestionCategoryTableData
          data={newsData}
          setPagination={handleChangePagination}
          toggleStatus={handleUpdateStatus}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          showDetail={handleShowDetail}
        />
      </div>

      {/* MODEL */}
      <Modal
        className={cx('modal-insert-source-news')}
        title='Th??m m???i danh m???c'
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
            <Input />
          </Form.Item>
          <Form.Item name='parentId' label='Danh m???c c???p cha'>
            {renderOptionParentData}
          </Form.Item>
          <Form.Item name='order' label='S??? th??? t???'>
            <Input type='number' min={0} />
          </Form.Item>

          <Form.Item name='description' label='M?? t???'>
            <TextArea />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              htmlType={mode.current === Mode.Edit ? 'C???p nh???t' : 'T???o m???i'}
            >
              {mode.current === Mode.Edit ? 'C???p nh???t' : 'T???o m???i'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isShowDetail}
        title='Hi???n th??? th??ng tin'
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelText='Tho??t'
        onCancel={() => {
          setIsShowDetail(false);
        }}
      >
        <Row gutter={8}>
          <Col span={16}>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Ti??u ?????</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Title}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>S??? th??? t???</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Order}</div>
              </Col>
            </Row>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>M?? t???</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Description}</div>
              </Col>
            </Row>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Ng??y t???o</div>
              </Col>
              <Col span={16}>
                <div>
                  {datetimeHelper.formatDatetimeToDateVN(
                    detail.current?.CreatedDate
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Ng??y s???a cu???i</div>
              </Col>
              <Col span={16}>
                <div>
                  {datetimeHelper.formatDatetimeToDateVN(
                    detail.current?.LastModifiedDate
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default QuestionCategoryPage;
