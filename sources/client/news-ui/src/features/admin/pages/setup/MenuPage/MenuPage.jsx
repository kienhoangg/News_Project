import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  FileAddFilled,
  LineOutlined,
} from '@ant-design/icons';
import { Tree, Button } from 'antd';
import setupApi from 'apis/setupApi';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import { NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import { useEffect, useRef, useState } from 'react';
import styles from './MenuPage.module.scss';
import MenuSearch from './MenuSearch/MenuSearch';
const { DirectoryTree } = Tree;
const cx = classNames.bind(styles);

MenuPage.propTypes = {};

MenuPage.defaultProps = {};
const treeData = [
  {
    Id: 1,
    ParentId: 0,
    Title: 'Trang chủ',
    Url: 'http://localhost:3000/page/6',
  },
  {
    Id: 2,
    ParentId: 0,
    Title: 'Giới thiệu',
    Url: 'http://localhost:3000/page/7',
  },
  {
    Id: 4,
    ParentId: 0,
    Title: 'Công dân',
    Url: 'http://localhost:3000/page/9',
  },
  {
    Id: 41,
    ParentId: 4,
    Title: 'Lịch tiếp công dân',
    Url: 'http://localhost:3000/page/4',
  },
  {
    Id: 42,
    ParentId: 4,
    Title: 'Kết quả giải quyết khiếu nại',
    Url: 'http://localhost:3000/page/5',
  },
  {
    Id: 5,
    ParentId: 0,
    Title: 'Doanh nghiệp',
    Url: 'http://localhost:3000/page/10',
  },
  {
    Id: 3,
    ParentId: 0,
    Title: 'Tổ chức bộ máy',
    Url: 'http://localhost:3000/page/8',
  },
  {
    Id: 31,
    ParentId: 3,
    Title: 'Tỉnh Uỷ',
    Url: 'http://localhost:3000/page/1',
  },
  {
    Id: 32,
    ParentId: 3,
    Title: 'Đoàn ĐBQH',
    Url: 'http://localhost:3000/page/2',
  },
  {
    Id: 33,
    ParentId: 3,
    Title: 'HĐND tỉnh',
    Url: 'http://localhost:3000/page/3',
  },
];
function MenuPage(props) {
  const [displayIcon, setDisplayIcon] = useState([]);
  const [dataTree, setDataTree] = useState([]);
  const isFirstCall = useRef(true);

  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }
    getMenuAll();
  }, []);

  const getMenuAll = async () => {
    try {
      const res = await setupApi.getMenuAll();
      setDataTree(treeData);
    } catch (err) {
      openNotification('Tạo mới tin thất bại', '', NotificationType.ERROR);
    }
  };

  function abc(id) {
    const _displayIcon = [];
    _displayIcon[id] = true;
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
        onClick={() => abc(id)}
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
            title='Đanh hiện thị'
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
  return (
    <div className={cx('wrapper')}>
      <div className={cx('top')}>
        <MenuSearch dataMenu={dataTree} />
        <div className={cx('btn-add-source-news')}>
          <Button type='primary' icon={<FileAddFilled />}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div className={cx('title')}>Cổng thông tin điện tử tỉnh</div>
      <Tree
        showLine
        defaultExpandAll
        treeData={commonFunc.list_to_tree(dataTree)}
        titleRender={(nodeData) => {
          return <Title title={nodeData.Title} id={nodeData.key} />;
        }}
      />
    </div>
  );
}

export default MenuPage;
