import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import classNames from 'classnames/bind';
import styles from './NewsCommentPageSearch.module.scss';

const cx = classNames.bind(styles);

NewsCommentPageSearch.propTypes = {};

NewsCommentPageSearch.defaultProps = {};

function NewsCommentPageSearch(props) {
    return (
        <div className={cx('wrapper')}>
            <Row gutter={16} style={{ marginBottom: 0 }}>
                <Col span={4}>
                    <Input style={{ width: '100%' }} placeholder='Từ khóa tìm kiếm' />
                </Col>
                <Col span={4}>
                    <Select placeholder='Danh mục tin' style={{ width: '100%' }}>
                        <Option value='1'>Lĩnh vực 1</Option>
                        <Option value='2'>Lĩnh vực 2</Option>
                        <Option value='3'>Lĩnh vực 3</Option>
                        <Option value='4'>Lĩnh vực 4</Option>
                        <Option value='5'>Lĩnh vực 5</Option>
                        <Option value='6'>Lĩnh vực 6</Option>
                    </Select>
                </Col>
                <Col span={2}>
                    <Row justify='start'>
                        <Button type='default' icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default NewsCommentPageSearch;
