import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, Tag, Modal } from 'antd';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import styles from './NewsSourceTableData.module.scss';
import classNames from 'classnames/bind';
import { PropTypes } from 'prop-types';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';

const cx = classNames.bind(styles);

NewsSourceTableData.propTypes = {
  /**
   * Func thay đổi phân trang
   */
  setPagination: PropTypes.func,

  /**
   * Xóa nguồn tin
   */
  deleteSourceNew: PropTypes.func,
};

NewsSourceTableData.defaultProps = {
  setPagination: () => {},
  deleteSourceNew: () => {},
};

function NewsSourceTableData(props) {
  const { data, setPagination, deleteSourceNew } = props;

  const columns = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Tiêu đề',
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: 'order',
      dataIndex: 'order',
      title: 'Số thứ tự',
      render: (order) => <a>{order}</a>,
      sorter: (a, b) => a.order - b.order,
      width: 100,
      align: 'right',
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: 'Mô tả',
      render: (Description) => <a>{Description}</a>,
      sorter: (a, b) => a.Description - b.Description,
      width: 200,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      align: 'center',
      width: 100,
      sorter: (a, b) => true,
      render: (_, { Id, Status }) => {
        let color = Status ? 'geekblue' : 'volcano';
        let text = Status ? 'Duyệt' : 'Hủy duyệt';
        return (
          <Tag
            color={color}
            key={Id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleOnClickStatus({ Id, Status })}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='primary'
            icon={<EditFilled />}
            onClick={() => handleChangeSourceNew(record)}
          >
            Sửa
          </Button>
          <Button
            type='ghost'
            danger
            icon={<DeleteFilled />}
            onClick={() => handleDeleteSourceNew(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
      width: 120,
    },
  ];

  let dataItems = data?.data ?? [];
  dataItems = dataItems.map((item) => {
    var createdDate = datetimeHelper.formatDateToDateVN(item.createdDate);
    return { ...item, createdDate: createdDate, key: item.id };
  });

  function handleChangeSourceNew(values) {
    console.log(values);
  }

  function handleDeleteSourceNew(values) {
    return Modal.confirm({
      title: 'Xóa nguồn tin',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn xóa không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => deleteSourceNewCustom(values),
    });
  }

  const deleteSourceNewCustom = (values) => {
    if (!deleteSourceNew) {
      return;
    }
    deleteSourceNew(values.id);
  };

  function handleOnClickStatus(values) {
    // console.log(values);
  }

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {
    setPagination(
      pagination.current,
      pagination.pageSize,
      sorter.columnKey,
      sorter.order === 'ascend' ? Direction.ASC : Direction.DESC
    );
  };

  return (
    <div className={cx('wrapper')}>
      <Table
        onChange={handleOnchangeTable}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 30],
          total: data?.total,
          showTotal: () =>
            commonRenderTable.showTableTotalPagination(data?.total ?? 0),
        }}
        dataSource={dataItems}
        size='small'
      />
    </div>
  );
}

export default NewsSourceTableData;
