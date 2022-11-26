import { Button, Card, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { NotificationType } from 'common/enum';
import Loading from 'components/Loading/Loading';
import { openNotification } from 'helpers/notification';
import { useState } from 'react';
import styles from './AccountPage.module.scss';

const cx = classNames.bind(styles);

AccountPage.propTypes = {};

function AccountPage(props) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onFinish = async (values) => {
    await changeAccount(values);
  };

  const changeAccount = async (body) => {
    try {
      console.log(body);
      setConfirmLoading(true);
    } catch (err) {
      openNotification('Đổi mật khẩu thất bại', '', NotificationType.ERROR);
    } finally {
      setConfirmLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={cx('account-page')}>
      <Loading show={confirmLoading} />

      <div className={cx('container')}>
        <Card title='Đổi mật khẩu' style={{ width: 800 }}>
          <Form
            name='changeAccount'
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
              name='Username'
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
              name='Password'
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Mật khẩu mới'
              name='PasswordNew'
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('Password') !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Mật khẩu mới không được giống mật khẩu cũ!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label='Nhập lại mật khẩu mới'
              name='RePasswordNew'
              rules={[
                {
                  required: true,
                  message: 'Không được để trống!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('PasswordNew') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Không trùng với mật khẩu mới!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type='primary' htmlType='submit'>
                Đổi
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default AccountPage;
