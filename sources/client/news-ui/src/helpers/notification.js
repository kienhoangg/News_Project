import { notification } from 'antd';

const notificationCustom = {
  success: (body) => {
    notification.success(body);
  },
  info: (body) => {
    notification.info(body);
  },
};

// TODO thông báo để demo
export const openNotification = (
  message,
  description = '',
  typeNotification = 'success',
  placement = 'top'
) => {
  const body = {
    message,
    description,
    placement,
  };
  notificationCustom[typeNotification](body);
};
