import { Divider, Form, Button, Input, Modal, Row, Col } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState, useRef } from 'react';
import NewsFieldPageSearch from './NewsFieldPageSearch/NewsFieldPageSearch';
import NewsFieldTableData from './NewsFieldTableData/NewsFieldTableData';
import styles from './NewsFieldPage.module.scss';
import classNames from 'classnames/bind';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { FileAddFilled } from '@ant-design/icons';
import { TypeUpdate } from 'common/constant';
const { TextArea } = Input;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Mode = {
  Create: 1,
  Edit: 0,
};
const cx = classNames.bind(styles);

NewsFieldPage.propTypes = {};

NewsFieldPage.defaultProps = {};

function NewsFieldPage(props) {
  const [newsData, setNewsData] = useState({});
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const detail = useRef({});
  const [isShowDetail, setIsShowDetail] = useState(false);
  const idEdit = useRef();
  const mode = useRef();

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    // if (isFirstCall.current) {
    //   isFirstCall.current = false;
    //   return;
    // }
    fetchProductList();
  }, [objFilter]);

  /**
   * Gọi api lấy dữ liệu danh sách
   */
  const fetchProductList = async () => {
    try {
      const response = await newsApi.getNewsFieldAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
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

  const handleDeleteFieldNews = async (id) => {
    try {
      await newsApi.deleteFieldNews(id);
      openNotification('Xóa thành công');
      fetchProductList();
    } catch (error) {
      openNotification('Xóa thất bại', '', NotificationType.ERROR);
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await newsApi.updateStatusFieldNews({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification('Cập nhật thành công');
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
  };

  const showModal = () => {
    mode.current = Mode.Create;
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  /**
   * Submit form tạo nguồn tin tức
   * @param {*} values Đối tượng submit form
   */
  const onFinish = async (values) => {
    values = {
      Title: values?.title ?? '',
      Description: values?.description ?? '',
      Order: parseInt(values?.order ?? 0),
      Factor: parseInt(values?.factor ?? 0),
      BiggestFactor: parseInt(values?.biggestFactor ?? 0),
    };
    setIsModalOpen(false);
    if (mode.current === Mode.Create) {
      await insertFieldNews(values);
    } else {
      await updateSounceNews(values);
    }
    form.resetFields();
    fetchProductList();
  };
  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const insertFieldNews = async (values) => {
    try {
      await newsApi.insertFieldNews(values);

      openNotification('Tạo mới lĩnh vực thành công');
    } catch (error) {
      openNotification('Tạo mới thất bại', '', NotificationType.ERROR);
    }
  };

  const updateSounceNews = async (values) => {
    try {
      await newsApi.updateFieldNews(idEdit.current, values);
      openNotification('Cập nhật thành công');
    } catch (error) {
      openNotification('Cập nhật thất bại', '', NotificationType.ERROR);
    }
  };
  async function handleShowDetail(Id) {
    const res = await getSourceNewById(Id);
    detail.current = res;
    setIsShowDetail(true);
  }

  async function getSourceNewById(id) {
    try {
      const res = await newsApi.getNewsFieldByID(id);
      return res;
    } catch (err) {
      openNotification(
        'Lấy chi tiết dữ liệu thất bại',
        '',
        NotificationType.ERROR
      );
      return null;
    }
  }

  async function handleUpdate(id) {
    const res = await getSourceNewById(id);
    idEdit.current = id;
    mode.current = Mode.Edit;
    form?.setFieldsValue({
      title: res?.Title,
      description: res?.Description,
      order: res?.Order,
      factor: res?.Factor,
      biggestFactor: res?.BiggestFactor,
    });
    setIsModalOpen(true);
  }
  return (
    <div className={cx('wrapper')}>
      {
        //#region Modal tạo mới
      }
      <Modal
        className={cx('modal-insert-source-news')}
        title={
          mode.current === Mode.Edit ? 'Cập nhật lĩnh vực' : 'Tạo mới lĩnh vực'
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} form={form} name='control-hooks' onFinish={onFinish}>
          <Form.Item
            name='title'
            label='Tiêu đề'
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='description' label='Mô tả'>
            <TextArea />
          </Form.Item>
          <Form.Item name='order' label='Số thứ tự'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='factor' label='Hệ số'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='biggestFactor' label='Hệ số lớn nhất'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              htmlType={mode.current === Mode.Edit ? 'Cập nhật' : 'Tạo mới'}
            >
              {mode.current === Mode.Edit ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {
        //#endregion */
      }

      <div className={cx('top')}>
        <NewsFieldPageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx('btn-add-field-news')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>

      <Divider style={{ margin: '0' }} />

      <div className={cx('table-data')}>
        <NewsFieldTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteFieldsNew={handleDeleteFieldNews}
          updateStatusNew={handleUpdateStatusNew}
          showDetail={handleShowDetail}
          updateData={handleUpdate}
        />
      </div>

      <Modal
        open={isShowDetail}
        title='Hiển thị thông tin'
        okButtonProps={{
          style: {
            display: 'none',
          },
        }}
        cancelText='Thoát'
        onCancel={() => {
          setIsShowDetail(false);
        }}
      >
        <Row gutter={8}>
          <Col span={16}>
            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Tiêu đề</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Title}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Mô tả</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Description}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Số thứ tự</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Order}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Hệ số</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.Factor}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={8}>
                <div className={cx('row-item-label')}>Hệ số lớn nhất</div>
              </Col>
              <Col span={16}>
                <div>{detail.current?.BiggestFactor}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default NewsFieldPage;
