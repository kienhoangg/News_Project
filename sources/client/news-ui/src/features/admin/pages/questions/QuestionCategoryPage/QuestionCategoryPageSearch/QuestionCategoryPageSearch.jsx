import { FileAddFilled, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row } from 'antd';
import classNames from 'classnames/bind';
import styles from './QuestionCategoryPageSearch.module.scss';
import { PropTypes } from 'prop-types';

const cx = classNames.bind(styles);

QuestionCategoryPageSearch.propTypes = {
    setTextSearch: PropTypes.func,
    handleOnClickCreate: PropTypes.func,
};

QuestionCategoryPageSearch.defaultProps = {
    setTextSearch: () => {},
    handleOnClickCreate: () => {},
};

function QuestionCategoryPageSearch(props) {
    const { setTextSearch, handleOnClickCreate } = props;

    function handleChange(event) {
        console.log(event?.target?.value);
        if (setTextSearch) {
            setTextSearch(event?.target?.value ?? '');
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Row gutter={16} style={{ marginBottom: 0 }}>
                <Col span={8}>
                    <Input style={{ width: '100%' }} placeholder='Từ khóa tìm kiếm' onChange={handleChange} />
                </Col>
                <Col span={2}>
                    <Row justify='start'>
                        <Button type='default' icon={<SearchOutlined />}>
                            Tìm kiếm
                        </Button>
                    </Row>
                </Col>
                <Col span={14}>
                    <Row justify='end'>
                        <Button type='primary' icon={<FileAddFilled />} onClick={handleOnClickCreate}>
                            Tạo mới
                        </Button>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default QuestionCategoryPageSearch;
