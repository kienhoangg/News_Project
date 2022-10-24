import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileAddFilled,
  LineOutlined,
} from '@ant-design/icons';
import { Tree, Button, Modal, Form, Select, Input, Checkbox } from 'antd';
import setupApi from 'apis/setupApi';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import { NotificationType, Direction } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { useEffect, useRef, useState } from 'react';
import styles from './MenuPage.module.scss';
import MenuSearch from './MenuSearch/MenuSearch';
import { Option } from 'antd/lib/mentions';
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
  orderBy: 'Title',
};

function MenuPage(props) {
  const [displayIcon, setDisplayIcon] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const isFirstCall = useRef(true);
  const dataResource = useRef([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      // return;
    }
    getMenuAll();
  }, []);

  const getMenuAll = async () => {
    try {
      const res = await setupApi.getMenuAll(filterAll);
      dataResource.current = res?.PagedData?.Results ?? [];
      setDataTree(res?.PagedData?.Results ?? []);
    } catch (err) {
      openNotification('Tạo mới tin thất bại', '', NotificationType.ERROR);
    }
  };

  function handleClickNode(id) {
    const _displayIcon = [];
    _displayIcon[id] = !displayIcon[id];
    setDisplayIcon(_displayIcon);
  }
  function xyz(id) {
    const _displayIcon = [];
    _displayIcon[id] = false;
    setDisplayIcon(_displayIcon);
  }

  function editMenu(e) {
    console.log('editMenu', e);
  }
  function disableMenu() {
    console.log('disableMenu');
  }
  function displayMenu() {
    console.log('displayMenu');
  }

  function deleteMenu() {
    console.log('deleteMenu');
  }

  const Title = (props) => {
    const { title, id } = props;
    return (
      <div
        onClick={() => handleClickNode(id)}
        // onMouseLeave={() => xyz(id)}
        // onBlur={() => xyz(id)}
        style={{ display: 'flex' }}
      >
        <div title={title}>{title}</div>
        <div style={{ display: displayIcon[id] ? 'block' : 'none' }}>
          <EditOutlined
            title='Sửa menu'
            style={{ margin: '0 10px', padding: 4 }}
            onClick={() => editMenu(id)}
          />
          <CheckOutlined
            title='Đang hiện thị'
            style={{ margin: '0 10px', padding: 4 }}
            onClick={disableMenu}
          />
          <LineOutlined
            title='Đang ẩn'
            style={{ margin: '0 10px', padding: 4 }}
            onClick={displayMenu}
          />
          <CloseOutlined
            title='Xóa menu'
            style={{ margin: '0 10px', padding: 4 }}
            onClick={deleteMenu}
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
      placeholder='Chọn cấp cha'
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
    values.parentID = parseInt(values?.parentId ?? 0);
    values.order = parseInt(values?.order ?? 0);
    console.log(values);
    insertCategoryNews(values);
    form.resetFields();
  };

  /**
   * Gọi api lấy dữ liệu danh sách nguồi tin tức
   */
  const insertCategoryNews = async (values) => {
    try {
      await setupApi.insertMenu(values);
      setIsModalOpen(false);
      getMenuAll();
      openNotification('Tạo mới danh mục thành công');
    } catch (error) {
      openNotification('Tạo mới danh mục thất bại', '', NotificationType.ERROR);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className={cx('wrapper')}>
      {
        //#region popup thêm mới
      }
      <Modal
        className={cx('modal-category-news')}
        title='Thêm mới danh mục tin'
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
            label='Tiêu đề'
            rules={[{ required: true, message: 'Tiêu đề không được để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name='parentId' label='Danh mục cấp cha'>
            {renderOption}
          </Form.Item>
          <Form.Item name='order' label='Số thứ tự'>
            <Input type='number' min={0} defaultValue={0} />
          </Form.Item>
          <Form.Item name='url' label='Địa chỉ (Url)'>
            <Input />
          </Form.Item>
          <Form.Item name='urlAdmin' label='UrlList quản trị'>
            <Input />
          </Form.Item>
          <Form.Item name='urlChildren' label='Menu con '>
            <Input />
          </Form.Item>
          <Form.Item
            name='isOpenNewTab'
            label='Mở trang mới'
            valuePropName='checked'
          >
            <Checkbox />
          </Form.Item>
          <Form.Item name='isPublish' label='Xuất bản' valuePropName='checked'>
            <Checkbox />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type='primary' htmlType='Tạo mới'>
              Tạo mới
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
            Thêm mới
          </Button>
        </div>
      </div>
      <div className={cx('title')}>Cổng thông tin điện tử tỉnh</div>
      <Tree
        showLine
        defaultExpandAll={true}
        treeData={commonFunc.list_to_tree(dataTree)}
        titleRender={(nodeData) => {
          return <Title title={nodeData.Title} id={nodeData.key} />;
        }}
      />
    </div>
  );
}

export default MenuPage;
