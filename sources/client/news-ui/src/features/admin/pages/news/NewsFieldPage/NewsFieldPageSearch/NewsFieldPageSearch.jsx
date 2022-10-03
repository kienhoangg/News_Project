import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import styles from './NewsFieldPageSearch.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsFieldPageSearch.propTypes = {};

NewsFieldPageSearch.defaultProps = {};

function NewsFieldPageSearch(props) {
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

export default NewsFieldPageSearch;
