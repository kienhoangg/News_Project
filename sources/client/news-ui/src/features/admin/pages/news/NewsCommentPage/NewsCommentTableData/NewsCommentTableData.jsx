import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import styles from './NewsCommentTableData.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsCommentTableData.propTypes = {};

NewsCommentTableData.defaultProps = {};

function NewsCommentTableData(props) {
  const { data } = props;

  const columns = [
    {
      key: 'Name',
      dataIndex: 'Name',
      title: 'Người gửi',
      render: (text) => <>{text}</>,
      sorter: (a, b) => a.Name - b.Name,
      width: 150,
    },
    {
      key: 'Title',
      dataIndex: 'Title',
      title: 'Tiêu đề tin',
      render: (text) => <>{text}</>,
      sorter: (a, b) => a.Title - b.Title,
    },
    {
      key: 'SendDate',
      dataIndex: 'SendDate',
      title: 'Ngày gửi',
      width: 110,
      sorter: (a, b) => a.SendDate - b.SendDate,
    },
    {
      key: 'Status',
      dataIndex: 'Status',
      title: 'Trạng thái',
      align: 'center',
      width: 100,
      sorter: (a, b) => true,
      render: (_, { Id, Status }) => {
        let color = !Status ? 'geekblue' : 'volcano';
        let text = !Status ? 'Duyệt' : 'Hủy duyệt';
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
          <Button type='ghost' danger icon={<DeleteFilled />}>
            Xóa
          </Button>
        </Space>
      ),
      width: 100,
    },
  ];

  let dataItems = data?.data ?? [];
  dataItems = dataItems.map((item) => {
    var SendDate = datetimeHelper.formatDateToDateVN(item.SendDate);
    return { ...item, SendDate: SendDate, key: item.Key };
  });

  function handleOnClickStatus(values) {
    // console.log(values);
  }

  return (
    <div className={cx('wrapper')}>
      <Table
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 30],
          showTotal: () =>
            commonRenderTable.showTableTotalPagination(data?.total ?? 0),
        }}
        dataSource={dataItems}
        size='small'
      />
    </div>
  );
}

export default NewsCommentTableData;
