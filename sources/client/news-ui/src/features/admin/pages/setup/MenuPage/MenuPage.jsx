import {
  CheckOutlined,
  CheckSquareOutlined,
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileAddFilled,
  InfoCircleOutlined,
  LineOutlined,
} from '@ant-design/icons';
import {
  Tree,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Checkbox,
  Row,
  Col,
} from 'antd';
import setupApi from 'apis/setupApi';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import { NotificationType, Direction } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { useEffect, useRef, useState } from 'react';
import styles from './MenuPage.module.scss';
import MenuSearch from './MenuSearch/MenuSearch';
import { Option } from 'antd/lib/mentions';
import { TypeUpdate, Role, DEFAULT_COLUMN_ORDER_BY } from 'common/constant';
import Loading from 'components/Loading/Loading';
const { DirectoryTree } = Tree;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const cx = classNames.bind(styles);

MenuPage.propTypes = {};

MenuPage.defaultProps = {};
const filterAll = {
  currentPage: 1,
  pageSize: 9_999_999,
  direction: Direction.DESC,
  orderBy: DEFAULT_COLUMN_ORDER_BY,
};

const Mode = {
  Create: 1,
  Edit: 0,
};

function MenuPage(props) {
  const [displayIcon, setDisplayIcon] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const isFirstCall = useRef(true);
  const dataResource = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const mode = useRef(Mode.Create);
  const idEdit = useRef(-1);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const detail = useRef({});
  const [confirmLoading, setConfirmLoading] = useState(true);

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      // return;
    }
    getMenuAll();
  }, []);

  const getMenuAll = async () => {
    try {
      setConfirmLoading(true);
      const res = await setupApi.getMenuAll(filterAll);
      dataResource.current = res?.PagedData?.Results ?? [];
      setDataTree(res?.PagedData?.Results ?? []);
    } catch (err) {
      openNotification('T???o m???i tin th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  function handleClickNode(id) {
    const _displayIcon = [];
    _displayIcon[id] = !displayIcon[id];
    setDisplayIcon(_displayIcon);
  }

  async function editMenu(id) {
    setConfirmLoading(true);
    const res = await setupApi.getMenuById(id);
    setConfirmLoading(false);
    if (res?.Status) {
      openNotification(
        <>
          <b>H???y duy???t</b> ????? c?? th??? ch???nh s???a
        </>,
        '',
        NotificationType.ERROR
      );

      return;
    }
    idEdit.current = id;
    mode.current = Mode.Edit;
    form?.setFieldsValue({
      title: res?.Title,
      parentId: res?.ParentId || null,
      order: res?.Order,
      url: res?.Url,
      urlAdmin: res?.UrlAdmin,
      urlChildren: res?.UrlChildren,
      isOpenNewTab: res?.IsOpenNewTab,
      isPublish: res?.IsPublish,
    });

    setIsModalOpen(true);
  }

  async function displayMenu(id, status) {
    const role = commonFunc.getCookie('role');
    if (role !== Role.ADMIN) {
      openNotification(
        <>
          Ch??? c?? <b>ADMIN</b> m???i th???c hi???n ???????c h??nh ?????ng n??y
        </>,
        '',
        NotificationType.ERROR
      );

      return;
    }
    Modal.confirm({
      title: 'C???p nh???t tr???ng th??i',
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          B???n c?? ch???c ch???n <b>DUY???T/H???Y DUY???T</b> kh??ng?
        </>
      ),
      okText: 'C???p nh???t',
      cancelText: 'H???y',
      onOk: async () => {
        try {
          setConfirmLoading(true);
          await setupApi.updateStatusMenu({
            Ids: [id],
            Value: status === 0 ? 1 : 0,
            Field: TypeUpdate.STATUS,
          });
          getMenuAll();
          openNotification('C???p nh???t th??nh c??ng');
        } catch (error) {
          openNotification('C???p nh???t th???t b???i', '', NotificationType.ERROR);
        } finally {
          setConfirmLoading(false);
        }
      },
    });
  }

  async function deleteMenu(id, status) {
    if (status) {
      openNotification(
        <>
          <b>H???y duy???t</b> tr?????c khi x??a
        </>,
        '',
        NotificationType.ERROR
      );
      return;
    }
    return Modal.confirm({
      title: 'X??a menu',
      icon: <ExclamationCircleOutlined />,
      content: 'B???n c?? ch???c ch???n x??a kh??ng?',
      okText: 'X??a',
      cancelText: 'H???y',
      onOk: async () => {
        try {
          setConfirmLoading(true);
          await setupApi.deleteMenu(id);
          openNotification('X??a th??nh c??ng');
          getMenuAll();
        } catch (error) {
          openNotification('X??a th???t b???i', '', NotificationType.ERROR);
        } finally {
          setConfirmLoading(false);
        }
      },
    });
  }

  async function handleShowDetail(Id) {
    setConfirmLoading(true);
    const res = await setupApi.getMenuById(Id);
    setConfirmLoading(false);
    detail.current = res;
    setIsShowDetail(true);
  }

  const Title = (props) => {
    const { record } = props;
    const { Title, Id, Status } = record;
    return (
      <div onClick={() => handleClickNode(Id)} style={{ display: 'flex' }}>
        <div
          title={Title}
          style={{
            textDecoration: Status ? 'none' : 'line-through',
            fontStyle: Status ? 'normal' : 'italic',
          }}
        >
          {Title}
        </div>
        <div style={{ display: displayIcon[Id] ? 'block' : 'none' }}>
          <InfoCircleOutlined
            title='Chi ti???t'
            style={{ margin: '0 10px', padding: 4, cursor: 'pointer' }}
            onClick={() => handleShowDetail(Id)}
          />
          <EditOutlined
            title='S???a menu'
            style={{ margin: '0 10px', padding: 4, cursor: 'pointer' }}
            onClick={() => editMenu(Id)}
          />
          <CheckSquareOutlined
            title={Status ? 'H???y duy???t' : 'Duy???t'}
            style={{
              margin: '0 10px',
              padding: 4,
              cursor: 'pointer',
              color: Status ? '#f81d22' : '#008000',
            }}
            onClick={() => displayMenu(Id, Status)}
          />
          <CloseOutlined
            title='X??a menu'
            style={{ margin: '0 10px', padding: 4, cursor: 'pointer' }}
            onClick={() => deleteMenu(Id, Status)}
          />
        </div>
      </div>
    );
  };

  const handleChangeView = (id) => {
    if (!id) {
      setDataTree(dataResource.current);
      return;
    }
    const dataFilter = dataResource.current.filter(
      (x) => x.Id === id || x.ParentId === id
    );
    setDataTree(dataFilter);
  };

  const renderOption = (
    <Select
      placeholder='Ch???n c???p cha'
      style={{ width: '100%' }}
      allowClear={true}
    >
      {dataResource.current
        .filter((x) => x.ParentId === 0)
        .map((x) => (
          <Option value={x.Id} key={x.Id}>
            {x.Title}
          </Option>
        ))}
    </Select>
  );
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    values.parentId = parseInt(values?.parentId || 0);
    values.url = (values?.url || '').trim();
    values.order = parseInt(values?.order ?? 0);
    if (mode.current === Mode.Create) {
      insertCategoryNews(values);
    } else {
      updateCategoryNews(values);
    }

    form.resetFields();
  };

  /**
   * G???i api l???y d??? li???u danh s??ch ngu???i tin t???c
   */
  const insertCategoryNews = async (values) => {
    try {
      setConfirmLoading(true);
      await setupApi.insertMenu(values);
      setIsModalOpen(false);
      getMenuAll();
      openNotification('T???o m???i danh m???c th??nh c??ng');
    } catch (error) {
      openNotification('T???o m???i danh m???c th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  /**
   * G???i api l???y d??? li???u danh s??ch ngu???i tin t???c
   */
  const updateCategoryNews = async (values) => {
    try {
      setConfirmLoading(true);
      await setupApi.updateMenu(idEdit.current, values);
      setIsModalOpen(false);
      getMenuAll();
      openNotification('C???p nh???t menu th??nh c??ng');
    } catch (error) {
      openNotification('C???p nh???t menu th???t b???i', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const showModal = () => {
    mode.current = Mode.Create;
    form?.setFieldsValue({});
    setIsModalOpen(true);
  };
  return (
    <div className={cx('wrapper')}>
      <Loading show={confirmLoading} />

      {
        //#region popup th??m m???i
      }
      <Modal
        className={cx('modal-category-news')}
        title='Th??m m???i danh m???c tin'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          form={form}
          name='control-hooks'
          onFinish={onFinish}
          initialValues={{
            isOpenNewTab: false,
            isPublish: false,
          }}
        >
          <Form.Item
            name='title'
            label='Ti??u ?????'
            rules={[{ required: true, message: 'Ti??u ????? kh??ng ???????c ????? tr???ng' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='parentId' label='Danh m???c c???p cha'>
            {renderOption}
          </Form.Item>
          <Form.Item name='order' label='S??? th??? t???'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='url' label='?????a ch??? (Url)'>
            <Input />
          </Form.Item>
          {/*           
          <Form.Item name='urlAdmin' label='UrlList qu???n tr???'>
            <Input />
          </Form.Item>
          <Form.Item name='urlChildren' label='Menu con '>
            <Input />
          </Form.Item>
          <Form.Item
            name='isOpenNewTab'
            label='M??? trang m???i'
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
          <Form.Item name='isPublish' label='Xu???t b???n' valuePropName='checked'>
            <Checkbox />
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type='primary'
              htmlType={mode.current === Mode.Edit ? 'S???a' : 'T???o m???i'}
            >
              {mode.current === Mode.Edit ? 'S???a' : 'T???o m???i'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {
        //#endregion
      }

      <div className={cx('top')}>
        <MenuSearch
          dataMenu={dataResource.current}
          changeParent={handleChangeView}
        />
        <div className={cx('btn-add-source-news')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Th??m m???i
          </Button>
        </div>
      </div>
      <div className={cx('title')}>C???ng th??ng tin ??i???n t??? t???nh</div>
      <Tree
        showLine
        defaultExpandAll={true}
        treeData={commonFunc.list_to_tree(dataTree)}
        titleRender={(nodeData) => {
          return <Title record={nodeData} />;
        }}
      />

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
              <Col span={10}>
                <div className={cx('row-item-label')}>Ti??u ?????</div>
              </Col>
              <Col span={14}>
                <div>{detail.current?.Title}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={10}>
                <div className={cx('row-item-label')}>Danh m???c c???p cha</div>
              </Col>
              <Col span={14}>
                <div>
                  {dataResource.current.find(
                    (x) => x.Id === detail.current?.ParentId
                  )?.Title ?? ''}
                </div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={10}>
                <div className={cx('row-item-label')}>S??? th??? t???</div>
              </Col>
              <Col span={14}>
                <div>{detail.current?.Order}</div>
              </Col>
            </Row>

            <Row gutter={16} className={cx('row-item')}>
              <Col span={10}>
                <div className={cx('row-item-label')}>?????a ch??? (Url)</div>
              </Col>
              <Col span={14}>
                <div>{detail.current?.Url}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
    </div>
  );
}

export default MenuPage;
