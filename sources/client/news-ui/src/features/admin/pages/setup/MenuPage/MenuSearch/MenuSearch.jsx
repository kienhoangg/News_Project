import { FileAddFilled } from '@ant-design/icons';
import { Button, Col, Row, TreeSelect } from 'antd';
import { TreeNode } from 'antd/lib/tree-select';
import classNames from 'classnames/bind';
import commonFunc from 'common/commonFunc';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './MenuSearch.module.scss';

const cx = classNames.bind(styles);

MenuSearch.propTypes = {
  setOpenCollectionEditor: PropTypes.func,
  /**
   * Func giúp Component bố gọi để thiết lập từ khóa cần tìm
   */
  setFilterNews: PropTypes.func,
};

MenuSearch.defaultProps = {
  setFilterNews: () => {},
};

function MenuSearch(props) {
  const { setOpenCollectionEditor, setActionForm, dataMenu } = props;
  const [objFilterNews, setObjFilterNews] = useState();

  const onChangeCategoryNews = (categoryNewsId) => {
    setObjFilterNews(categoryNewsId);
  };

  const generateTree = (arrNode) => {
    return arrNode.map((x) => (
      <TreeNode value={x.Id} title={x.Title} key={x.Id}>
        {x.children.length > 0 && generateTree(x.children)}
      </TreeNode>
    ));
  };
  const renderMenu = (
    <TreeSelect
      showSearch
      style={{
        width: '100%',
      }}
      value={objFilterNews}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
      }}
      placeholder='Chọn menu'
      allowClear
      treeDefaultExpandAll
      onChange={onChangeCategoryNews}
    >
      {generateTree(commonFunc.list_to_tree(dataMenu ?? []))}
    </TreeSelect>
  );

  return <div className={cx('wrapper')}>{renderMenu}</div>;
}

export default MenuSearch;
