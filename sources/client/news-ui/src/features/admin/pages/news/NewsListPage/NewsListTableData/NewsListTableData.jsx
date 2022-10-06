import { EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { commonRenderTable } from 'common/commonRender';
import { Direction } from 'common/enum';
import datetimeHelper from 'helpers/datetimeHelper';
import PropTypes from 'prop-types';
import styles from './NewsListTableData.module.scss';

const cx = classNames.bind(styles);

NewsListTableData.propTypes = {
  data: PropTypes.object,
  onClickShowRowDetail: PropTypes.func,
  /**
   * Func thay đổi phân trang
   */
  setPagination: PropTypes.func,

  /**
   * Xóa nguồn tin
   */
  deleteNew: PropTypes.func,
};

NewsListTableData.defaultProps = {
  setPagination: () => {},
  deleteNew: () => {},
};

function NewsListTableData(props) {
  const {
    data,
    onClickShowRowDetail,
    onClickEditOneRow,
    setPagination,
    setActionForm,
  } = props;
  const handleOnClickTitle = (values) => {
    if (onClickShowRowDetail) onClickShowRowDetail(values);
  };

  const handleOnClickEditRow = (values) => {
    if (!onClickEditOneRow || !setActionForm) {
      return;
    }
    onClickEditOneRow(values);
    setActionForm('edit');
  };

  const columns = [
    {
      key: 'title',
      dataIndex: 'title',
      title: 'Tiêu đề',
      render: (_, { id, title }) => (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            handleOnClickTitle({ id, title });
          }}
        >
          {title}
        </div>
      ),
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: 'createdDate',
      dataIndex: 'CreatedDate',
      title: 'Ngày tạo',
      width: 110,
      sorter: (a, b) => a.createdDate - b.createdDate,
    },
    {
      title: 'Thông tin',
      dataIndex: 'Description',
      key: 'description',
      width: 200,
      sorter: (a, b) => true,
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      align: 'center',
      width: 100,
      sorter: (a, b) => true,
      render: (_, { id, status }) => {
        let color = status ? 'geekblue' : 'volcano';
        let text = status ? 'Duyệt' : 'Hủy duyệt';
        return (
          <Tag
            color={color}
            key={id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleOnClickStatus({ id, status })}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      key: 'action',
      render: (_, { id, status }) => (
        <Space size='middle'>
          <Button
            type='primary'
            icon={<EditFilled />}
            onClick={handleOnClickEditRow}
          >
            Sửa
          </Button>
        </Space>
      ),
      width: 100,
    },
  ];

  let dataItems = data?.data ?? [];
  dataItems = dataItems.map((item) => {
    var createdDate = datetimeHelper.formatDateToDateVN(item.createdDate);
    return { ...item, CreatedDate: createdDate, key: item.id };
  });

  function handleOnClickStatus(values) {
    // console.log(values);
  }

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {
    if (!setPagination) {
      return;
    }
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

export default NewsListTableData;
