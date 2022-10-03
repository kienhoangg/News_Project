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
};

NewsListMenuSearch.defaultProps = {};

function NewsListMenuSearch(props) {
    const { setOpenCollectionEditor } = props;
    const [valueNewsType, setValuNewsType] = useState(undefined);

    const onChangeNewsType = (newValue) => {
        setValuNewsType(newValue);
    };

    const handleOnclickCreate = () => {
        if (setOpenCollectionEditor) {
            setOpenCollectionEditor(true);
        }
    };

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
                            <TreeNode value='1.1' title='Tin trong tỉnh'></TreeNode>
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
                    <Input placeholder='Từ khóa tìm kiếm' />
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
                <Col span={4}>
                    <Select placeholder='Lĩnh vực' style={{ width: '100%' }}>
                        <Option value='1'>Lĩnh vực 1</Option>
                        <Option value='2'>Lĩnh vực 2</Option>
                        <Option value='3'>Lĩnh vực 3</Option>
                        <Option value='4'>Lĩnh vực 4</Option>
                        <Option value='5'>Lĩnh vực 5</Option>
                        <Option value='6'>Lĩnh vực 6</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <Row justify='end'>
                        <Button type='default' icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Row>
                </Col>
                <Col span={4}>
                    <Button type='default'>Kho ảnh</Button>
                </Col>
                <Col span={4}>
                    <Button type='primary' style={{ width: '100%' }} icon={<FileAddFilled />} onClick={handleOnclickCreate}>
                        Tạo mới
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default NewsListMenuSearch;
