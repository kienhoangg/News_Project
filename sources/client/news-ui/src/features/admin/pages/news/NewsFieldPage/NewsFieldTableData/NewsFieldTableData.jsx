import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, Tag, Modal } from 'antd';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import styles from './NewsFieldTableData.module.scss';
import classNames from 'classnames/bind';
import { PropTypes } from 'prop-types';
import { Direction } from 'common/enum';

const cx = classNames.bind(styles);

NewsFieldTableData.propTypes = {
  /**
   * Func thay đổi phân trang
   */
  setPagination: PropTypes.func,

  /**
   * Xóa
   */
  deleteFieldsNew: PropTypes.func,
};

NewsFieldTableData.defaultProps = {
  setPagination: () => {},
  deleteFieldsNew: () => {},
};

function NewsFieldTableData(props) {
  const { data, setPagination, deleteFieldsNew } = props;

  function handleDeleteFieldNew(values) {
    return Modal.confirm({
      title: 'Xóa loại tin',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn xóa không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => deleteFieldNewCustom(values),
    });
  }

  const deleteFieldNewCustom = (values) => {
    if (!deleteFieldsNew) {
      return;
    }
    deleteFieldsNew(values.id);
  };

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {
    setPagination(
      pagination.current,
      pagination.pageSize,
      sorter.columnKey,
      sorter.order === 'ascend' ? Direction.ASC : Direction.DESC
    );
  };

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
      render: (order) => <>{order}</>,
      sorter: (a, b) => a.order - b.order,
      width: 100,
      align: 'right',
    },
    {
      key: 'factor',
      dataIndex: 'factor',
      title: 'Hệ số',
      render: (factor) => <>{factor}</>,
      sorter: (a, b) => a.factor - b.factor,
      width: 100,
      align: 'right',
    },
    {
      key: 'biggestFactor',
      dataIndex: 'biggestFactor',
      title: 'Hệ số lớn nhất',
      render: (biggestFactor) => <>{biggestFactor}</>,
      sorter: (a, b) => a.biggestFactor - b.biggestFactor,
      width: 130,
      align: 'right',
    },
    {
      key: 'status',
      dataIndex: 'Status',
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
          <Button type='primary' icon={<EditFilled />}>
            Sửa
          </Button>
          <Button
            type='ghost'
            danger
            icon={<DeleteFilled />}
            onClick={() => handleDeleteFieldNew(record)}
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
    var createdDate = datetimeHelper.formatDateToDateVN(item.CreatedDate);
    return { ...item, CreatedDate: createdDate, key: item.id };
  });

  function handleOnClickStatus(values) {
    // console.log(values);
  }

  return (
    <div className={cx('wrapper')}>
      <Table
        columns={columns}
        onChange={handleOnchangeTable}
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

export default NewsFieldTableData;
