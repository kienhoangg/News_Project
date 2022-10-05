import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  LineOutlined,
} from '@ant-design/icons';
import { Tree } from 'antd';
import classNames from 'classnames/bind';
import styles from './MenuPage.module.scss';
import { useState } from 'react';
const { DirectoryTree } = Tree;
const cx = classNames.bind(styles);

MenuPage.propTypes = {};

MenuPage.defaultProps = {};

function MenuPage(props) {
  const [displayIcon, setDisplayIcon] = useState(false);
  const treeData = [
    {
      title: 'parent 0',
      key: '0-0',
      children: [
        { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
        { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 1',
      key: '0-1',
      children: [
        { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
        {
          title: (
            <div
              onMouseEnter={abc}
              onMouseLeave={xyz}
              style={{ display: 'flex' }}
            >
              <div>ddleaf 1-1</div>
              <div style={{ display: displayIcon ? 'block' : 'none' }}>
                <EditOutlined
                  title='Sửa menu'
                  style={{ margin: '0 8px' }}
                  onClick={editMenu}
                />
                <CheckOutlined
                  title='Đanh hiện thị'
                  style={{ margin: '0 8px' }}
                  onClick={disableMenu}
                />
                <LineOutlined
                  title='Đang ẩn'
                  style={{ margin: '0 8px' }}
                  onClick={displayMenu}
                />
                <CloseOutlined
                  title='Xóa menu'
                  style={{ margin: '0 8px' }}
                  onClick={deleteMenu}
                />
              </div>
            </div>
          ),
          key: '0-1-1',
          isLeaf: true,
        },
      ],
    },
  ];

  function abc() {
    setDisplayIcon(true);
  }
  function xyz() {
    setDisplayIcon(false);
  }

  function editMenu() {
    console.log('editMenu');
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

  const onSelect = (keys, info) => {
    // console.log('Trigger Select', keys, info);
  };

  function titleCustom(title) {
    return <div>{title} - 123</div>;
  }

  return (
    <div>
      <div>Cổng thông tin điện tử tỉnh</div>
      <Tree
        showLine
        defaultExpandAll
        // onSelect={onSelect}
        treeData={treeData}
        // titleRender={titleCustom}
      />
    </div>
  );
}

export default MenuPage;
