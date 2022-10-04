import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormVisitorComment.module.scss';
import classNames from 'classnames/bind';
import { Button, Form, Input, Row } from 'antd';

const cx = classNames.bind(styles);

FormVisitorComment.propTypes = {};

FormVisitorComment.defaultProps = {};

function FormVisitorComment(props) {
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    return (
        <div className={cx('wrapper')}>
            <Form
                name='visitor-form'
                form={form}
                // onFinish={onFinish}
                // labelCol={{
                //     span: 8,
                // }}
                // wrapperCol={{
                //     span: 16,
                // }}
            >
                <Form.Item name={'comment'}>
                    <Input.TextArea
                        placeholder='Nhập bình luận'
                        showCount
                        maxLength={1000}
                        style={{
                            height: 80,
                        }}
                    />
                </Form.Item>
                <Form.Item
                    // label='BirthDate'
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item
                        name='Họ và tên'
                        rules={[
                            {
                                required: true,
                                message: 'Trường bắt buộc',
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 4px)',
                        }}
                    >
                        <Input placeholder='Họ tên người gửi' />
                    </Form.Item>
                    {/* <Form.Item
                        name='month'
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 4px)',
                            margin: '0 0 0 8px',
                        }}
                    >
                        <Input placeholder='Input birth month' />
                    </Form.Item> */}
                </Form.Item>
                {/* <Row justify='center'> */}
                <Form.Item
                    colon={false}
                    style={{
                        margin: '0',
                    }}
                >
                    <Button type='primary' htmlType='submit'>
                        Gửi bình luận
                    </Button>
                    <Button
                        htmlType='button'
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={onReset}
                    >
                        Nhập lại
                    </Button>
                </Form.Item>
                {/* </Row> */}
            </Form>
        </div>
    );
}

export default FormVisitorComment;
