import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import styles from './NewsSourcePageSearch.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsSourcePageSearch.propTypes = {};

NewsSourcePageSearch.defaultProps = {};

function NewsSourcePageSearch(props) {
    return (
        <div className={cx('wrapper')}>
            <Row gutter={16} style={{ marginBottom: 0 }}>
                <Col span={8}>
                    <Input style={{ width: '100%' }} placeholder='Từ khóa tìm kiếm' />
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

export default NewsSourcePageSearch;
