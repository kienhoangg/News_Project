import { DatePicker, Divider, Form, Input, Modal } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import NewsCollaboratorsPageSearch from './NewsCollaboratorsPageSearch/NewsCollaboratorsPageSearch';
import NewsCollaboratorsTableData from './NewsCollaboratorsTableData/NewsCollaboratorsTableData';

import classNames from 'classnames/bind';
import styles from './NewsCollaboratorsPage.module.scss';
import { Direction, NotificationType } from 'common/enum';
import axiosClient from 'apis/axiosClient';
import { TypeUpdate } from 'common/constant';
import { openNotification } from 'helpers/notification';
import datetimeHelper from 'helpers/datetimeHelper';
import convertHelper from 'helpers/convertHelper';
import moment from 'moment';
import Loading from 'components/Loading/Loading';

const cx = classNames.bind(styles);

NewsCollaboratorsPage.propTypes = {};

NewsCollaboratorsPage.defaultProps = {};

function NewsCollaboratorsPage(props) {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const POPUP_TYPE = {
    CREATE: 0,
    UPDATE: 1,
    DETAIL: 2,
  };
  const [isModalOpen, setIsModalOpen] = useState({
    comment: null,
    show: false,
    type: null,
  });

  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });
  const [confirmLoading, setConfirmLoading] = useState(true);

  useEffect(() => {
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      setConfirmLoading(true);
      const response = await newsApi.getNewsCollaboratorsAll(objFilter);

      setNewsData({
        data: response?.PagedData?.Results,
        total: response?.PagedData?.RowCount,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    } finally {
      setConfirmLoading(false);
    }
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

  const handleUpdateStatusNew = async (values) => {
    try {
      setConfirmLoading(true);
      await axiosClient.put('/collaborators', {
        ids: [values.Id],
        value: values.Status === 0,
        field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification('C???p nh???t th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDeleteCategoryNew = async (res) => {
    try {
      setConfirmLoading(true);
      await axiosClient.delete('/collaborators/' + res?.Id);
      openNotification('X??a b??nh lu???n th??nh c??ng');
      fetchProductList();
    } catch (error) {
      openNotification('X??a b??nh lu???n th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * S??? l?? thay ?????i text search
   * @param {*} textSearch T??? c???n t??m
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({
      ...objFilter,
      keyword: textSearch,
    });
  };

  const onCancel = () => {
    setIsModalOpen({
      imageDetail: null,
      type: null,
      show: false,
    });
    form.resetFields();
  };

  const onCreate = async (values = {}) => {
    try {
      setConfirmLoading(true);
      if (isModalOpen?.type === POPUP_TYPE.CREATE) {
        await axiosClient.post('/collaborators', values?.JsonString);
        openNotification('T???o m???i th??nh c??ng');
      } else {
        await axiosClient.put(
          '/collaborators/' + isModalOpen?.comment?.Id,
          values?.JsonString
        );
        openNotification('C???p nh???t th??nh c??ng');
      }
      onCancel();
      fetchProductList();
    } catch (error) {
      openNotification('C???p nh???t tin t???c th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />

      <Modal
        open={isModalOpen?.show}
        title={
          isModalOpen?.type === POPUP_TYPE.DETAIL
            ? 'Chi ti???t T??c gi???'
            : isModalOpen?.type === POPUP_TYPE.CREATE
            ? 'Th??m m???i T??c gi???'
            : 'Ch???nh s???a th??ng tin'
        }
        okText={isModalOpen?.type === POPUP_TYPE.CREATE ? 'T???o m???i' : 'L??u'}
        cancelText='Tho??t'
        onCancel={() => {
          onCancel();
        }}
        {...(isModalOpen?.type === POPUP_TYPE.DETAIL
          ? {
              footer: null,
            }
          : {})}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              let bodyData = {
                Name: values?.Name,
                Username: values?.Username,
                BirthDate: values?.BirthDate
                  ? datetimeHelper.formatDatetimeToDateSerer(values?.BirthDate)
                  : null,
                Address: values?.Address,
                Phone: values?.Phone,
                Email: values?.Email,
              };

              let body = { JsonString: bodyData };

              onCreate(body);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} {...layout} name='control-hooks'>
          <Form.Item
            label='H??? v?? t??n'
            name='Name'
            rules={[
              {
                required: true,
                message: 'Ti??u ????? kh??ng ???????c ????? tr???ng',
              },
            ]}
          >
            {isModalOpen?.type === POPUP_TYPE.DETAIL ? (
              <div>{isModalOpen?.comment?.Name}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item label='T??n ????ng nh???p' name='Username'>
            {isModalOpen?.type === POPUP_TYPE.DETAIL ? (
              <div>{isModalOpen?.comment?.Username}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item
            label='Ng??y sinh'
            name='BirthDate'
            rules={[
              {
                required: true,
                message: 'Ng??y sinh kh??ng ???????c ????? tr???ng',
              },
            ]}
          >
            {isModalOpen?.type === POPUP_TYPE.DETAIL ? (
              <div>
                {moment(isModalOpen?.comment?.BirthDate).format('DD/MM/YYYY')}
              </div>
            ) : (
              <DatePicker
                disabled={isModalOpen?.type === POPUP_TYPE.DETAIL}
                placeholder='Ng??y sinh'
                style={{ width: '100%' }}
              />
            )}
          </Form.Item>
          <Form.Item label='?????a ch???' name='Address'>
            {isModalOpen?.type === POPUP_TYPE.DETAIL ? (
              <div>{isModalOpen?.comment?.Address}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item label='??i???n tho???i' name='Phone'>
            {isModalOpen?.type === POPUP_TYPE.DETAIL ? (
              <div>{isModalOpen?.comment?.Phone}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
          <Form.Item label='Email' name='Email'>
            {isModalOpen?.type === POPUP_TYPE.DETAIL ? (
              <div>{isModalOpen?.comment?.Email}</div>
            ) : (
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>

      <div className={cx('top')}>
        <NewsCollaboratorsPageSearch
          setTextSearch={handleChangeTextSearch}
          onCreate={() => {
            setIsModalOpen({
              id: null,
              show: true,
              type: POPUP_TYPE.CREATE,
            });
          }}
        />
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <NewsCollaboratorsTableData
          data={newsData}
          setPagination={handleChangePagination}
          updateStatusNew={handleUpdateStatusNew}
          deleteCategoryNew={handleDeleteCategoryNew}
          onEdit={(item) => {
            setIsModalOpen({
              comment: item,
              show: true,
              type: POPUP_TYPE.UPDATE,
            });
            form.setFieldsValue({
              Name: item?.Name,
              Username: item?.Username,
              BirthDate: moment(item?.BirthDate),
              Address: item?.Address,
              Phone: item?.Phone,
              Email: item?.Email,
            });
          }}
          onClickRow={(item) => {
            setIsModalOpen({
              comment: item,
              show: true,
              type: POPUP_TYPE.DETAIL,
            });
            form.setFieldsValue({
              Name: item?.Name,
              Username: item?.Username,
              BirthDate: moment(item?.BirthDate),
              Address: item?.Address,
              Phone: item?.Phone,
              Email: item?.Email,
            });
          }}
        />
      </div>
    </div>
  );
}

export default NewsCollaboratorsPage;
