import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Button, Space, Table, Tag, Modal } from 'antd';
import PropTypes from 'prop-types';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import styles from './StaticContentTableData.module.scss';
import classNames from 'classnames/bind';
import { Direction } from 'common/enum';

const cx = classNames.bind(styles);

StaticContentTableData.propTypes = {
  data: PropTypes.shape({
    Title: PropTypes.string,
    OrderNumber: PropTypes.number,
    Status: PropTypes.bool,
  }),
  onClickShowRowDetail: PropTypes.func,
};

StaticContentTableData.defaultProps = {};

function StaticContentTableData(props) {
  const { data, onClickShowRowDetail, setPagination, deleteCategoryNew } =
    props;

  const handleOnClickTitle = (values) => {
    if (onClickShowRowDetail) onClickShowRowDetail(values);
  };

  const columns = [
    {
      key: 'Title',
      dataIndex: 'Title',
      title: 'Tiêu đề',
      render: (_, { id, Title }) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleOnClickTitle({ id, Title });
          }}
        >
          {Title}
        </div>
      ),
      sorter: (a, b) => a.CategoryNewsName - b.CategoryNewsName,
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
      // title: 'Xóa',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='ghost'
            danger
            icon={<DeleteFilled />}
            onClick={() => handleDeleteCategoryNew(record)}
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
    return { ...item, CreatedDate: createdDate, key: item.Id };
  });

  function handleChangeSourceNew(values) {
    console.log(values);
  }

  function handleDeleteCategoryNew(values) {
    return Modal.confirm({
      title: 'Xóa danh mục tin',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn xóa không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => deleteCategoryNewCustom(values),
    });
  }

  const deleteCategoryNewCustom = (values) => {
    if (!deleteCategoryNew) {
      return;
    }
    deleteCategoryNew(values.Id);
  };

  function handleOnClickStatus(values) {
    // console.log(values);
  }

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {
    setPagination(
      pagination.current,
      pagination.pageSize,
      sorter.columnKey,
      sorter.Order === 'ascend' ? Direction.ASC : Direction.DESC
    );
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`);
      // if (!changeRowKey) {
      //   return;
      // }
      // changeRowKey(selectedRowKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      //   console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      //   console.log(`selectedRowKeys: ${selected}`);
    },
  };

  return (
    <div className={cx('wrapper')}>
      <Table
        columns={columns}
        // rowSelection={rowSelection}
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

export default StaticContentTableData;
