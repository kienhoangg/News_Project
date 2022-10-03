import { Button, Card, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import routes from 'config/configRoutes';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.scss';

const cx = classNames.bind(styles);

LoginPage.propTypes = {};

LoginPage.defaultProps = {};

function LoginPage(props) {
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log('Success:', values);
        navigate(routes.admin);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className={cx('login')}>
            <div className={cx('container')}>
                <Card title='Đăng nhập' style={{ width: 500 }}>
                    {' '}
                    <Form
                        name='login'
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item
                            label='Tên đăng nhập'
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label='Mật khẩu'
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        {/* <Form.Item
                            name='remember'
                            valuePropName='checked'
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type='primary' htmlType='submit'>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;
