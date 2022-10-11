import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './NewsListMenuSearch.module.scss';
import classNames from 'classnames/bind';
import { Button, Col, DatePicker, Input, Row, Select, TreeSelect } from 'antd';
import { TreeNode } from 'antd/lib/tree-select';
import { Option } from 'antd/lib/mentions';
import { FileAddFilled, SearchOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

NewsListMenuSearch.propTypes = {
  setOpenCollectionEditor: PropTypes.func,
  /**
   * Func giúp Component bố gọi để thiết lập từ khóa cần tìm
   */
  setTextSearch: PropTypes.func,
};

NewsListMenuSearch.defaultProps = {
  setTextSearch: () => {},
};

function NewsListMenuSearch(props) {
  const { setOpenCollectionEditor, setTextSearch, setActionForm, dataFilter } =
    props;
  const [valueNewsType, setValuNewsType] = useState(undefined);
  const [keyword, setKeyword] = useState('');

  const onChangeNewsType = (newValue) => {
    console.log(newValue);
    setValuNewsType(newValue);
  };

  const handleOnclickCreate = () => {
    if (!setOpenCollectionEditor || !setActionForm) {
      return;
    }
    setOpenCollectionEditor(true);
    setActionForm('create');
  };

  const handleChangeTextSearch = (event) => {
    const textSearch = event?.target?.value?.trim() ?? '';
    setKeyword(textSearch);
    // TODO: Xóa nếu bỏ search trong lúc gõ
    setTextSearch(textSearch);
  };

  /**
   * Sử lý sự kiện bấp search
   */
  const handleOnclickButtonSearch = () => {
    if (!setTextSearch) {
      return;
    }
    setTextSearch(keyword);
  };

  const renderFieldNews = (
    <Select placeholder='Lĩnh vực' style={{ width: '100%' }}>
      {dataFilter?.fieldNews?.map((x) => (
        <Option value={x.Id} key={x.Id}>
          {x.Title}
        </Option>
      ))}
    </Select>
  );

  return (
    <div className={cx('wrapper')}>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={4}>
          <TreeSelect
            showSearch
            style={{
              width: '100%',
            }}
            value={valueNewsType}
            dropdownStyle={{
              maxHeight: 400,
              overflow: 'auto',
            }}
            placeholder='Chọn loại tin tức'
            allowClear
            treeDefaultExpandAll
            onChange={onChangeNewsType}
          >
            <TreeNode value='1' title='Tin tức'>
              <TreeNode value='1.1' title='Tin trong tỉnh' />
              <TreeNode value='1.2' title='Chính sách mới' />
              <TreeNode value='1.3' title='Hoạt động chỉ đạo điều hành' />
            </TreeNode>
            <TreeNode value='2' title='Tin tức 2'>
              <TreeNode value='2.2' title='Chính sách mới 2' />
              <TreeNode value='2.3' title='Hoạt động chỉ đạo điều hành 2' />
            </TreeNode>
          </TreeSelect>
        </Col>
        <Col span={4}>
          <Input
            placeholder='Từ khóa tìm kiếm'
            onChange={handleChangeTextSearch}
          />
        </Col>
        <Col span={4}>
          <DatePicker placeholder='Từ ngày' style={{ width: '100%' }} />
        </Col>
        <Col span={4}>
          <DatePicker placeholder='Đến ngày' style={{ width: '100%' }} />
        </Col>
        <Col span={4}>
          <Select placeholder='Phân loại tin' style={{ width: '100%' }}>
            <Option value='1'>Tin số 1</Option>
            <Option value='2'>Tin số 2</Option>
            <Option value='3'>Tin số 3</Option>
            <Option value='4'>Tin số 4</Option>
          </Select>
        </Col>
        <Col span={4}>
          <Select placeholder='Biên tập viên' style={{ width: '100%' }}>
            <Option value='1'>Biên tập viên 1</Option>
            <Option value='2'>Biên tập viên 2</Option>
            <Option value='3'>Biên tập viên 3</Option>
            <Option value='4'>Biên tập viên 4</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={4}>
          <Select placeholder='Cộng tác viên' style={{ width: '100%' }}>
            <Option value='1'>Cộng tác viên 1</Option>
            <Option value='2'>Cộng tác viên 2</Option>
            <Option value='3'>Cộng tác viên 3</Option>
            <Option value='4'>Cộng tác viên 4</Option>
            <Option value='5'>Cộng tác viên 5</Option>
            <Option value='6'>Cộng tác viên 6</Option>
          </Select>
        </Col>
        <Col span={4}>
          <Select placeholder='Trạng thái tin' style={{ width: '100%' }}>
            <Option value='1'>Đã duyệt</Option>
            <Option value='2'>Chưa được duyệt</Option>
          </Select>
        </Col>
        <Col span={4}>{renderFieldNews}</Col>
        <Col span={4}>
          <Row justify='end'>
            <Button
              type='default'
              icon={<SearchOutlined />}
              onClick={handleOnclickButtonSearch}
            >
              Tìm kiếm
            </Button>
          </Row>
        </Col>
        <Col span={4}>
          <Button type='default'>Kho ảnh</Button>
        </Col>
        <Col span={4}>
          <Button
            type='primary'
            style={{ width: '100%' }}
            icon={<FileAddFilled />}
            onClick={handleOnclickCreate}
          >
            Tạo mới
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default NewsListMenuSearch;
