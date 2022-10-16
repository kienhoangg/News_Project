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
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: 'PublishedDate',
      dataIndex: 'PublishedDate',
      title: 'Ngày tạo',
      width: 200,
      sorter: (a, b) => a.PublishedDate - b.PublishedDate,
      render: (_, { PublishedDate }) => (
        <div>
          {PublishedDate.includes('0001')
            ? '- - -'
            : datetimeHelper.formatDateToDateVN(PublishedDate)}
        </div>
      ),
    },
    {
      title: 'Thông tin',
      dataIndex: 'description',
      key: 'Description',
      width: 200,
      sorter: (a, b) => true,
    },
    {
      key: 'Status',
      dataIndex: 'Status',
      title: 'Trạng thái',
      align: 'center',
      width: 100,
      sorter: (a, b) => true,
      render: (_, { id, Status }) => {
        let color = Status ? 'geekblue' : 'volcano';
        let text = Status ? 'Duyệt' : 'Hủy duyệt';
        return (
          <Tag
            color={color}
            key={id}
            style={{ cursor: 'pointer' }}
            onClick={() => handleOnClickStatus({ id, Status })}
          >
            {text}
          </Tag>
        );
      },
    },
  ];

  let dataItems = data?.data ?? [];
  dataItems = dataItems.map((item) => {
    var createdDate = datetimeHelper.formatDateToDateVN(item.createdDate);
    return { ...item, CreatedDate: createdDate, key: item.Id };
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
