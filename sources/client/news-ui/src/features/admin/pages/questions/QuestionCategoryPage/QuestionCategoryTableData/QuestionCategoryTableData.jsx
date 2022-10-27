import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import classNames from 'classnames/bind';
import styles from './QuestionCategoryTableData.module.scss';

const cx = classNames.bind(styles);

QuestionCategoryTableData.propTypes = {};

QuestionCategoryTableData.defaultProps = {};

function QuestionCategoryTableData(props) {
  const { data } = props;

  const columns = [
    {
      key: 'title',
      dataIndex: 'Title',
      title: 'Tiêu đề',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: 'CreatedBy',
      dataIndex: 'CreatedBy',
      title: 'Người hỏi',
      width: 120,
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.CreatedBy - b.CreatedBy,
    },
    {
      key: 'IsAnswer',
      dataIndex: 'IsAnswer',
      title: 'Trạng thái trả lời',
      width: 150,
      sorter: (a, b) => true,
      render: (_, { Id, IsAnswer }) => {
        let color = IsAnswer ? 'geekblue' : 'volcano';
        let text = IsAnswer ? 'Đã trả lời' : 'Chưa trả lời';
        return (
          <Tag color={color} key={Id} style={{ cursor: 'pointer' }}>
            {text}
          </Tag>
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'Status',
      title: 'Trạng thái',
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
          <Button type='primary' icon={<EditFilled />}>
            Sửa
          </Button>
          <Button type='ghost' danger icon={<DeleteFilled />}>
            Xóa
          </Button>
        </Space>
      ),
      width: 120,
    },
  ];

  let dataItems = data?.data ?? [];
  dataItems = dataItems.map((item) => {
    var PublishedDate = datetimeHelper.formatDateToDateVN(item.PublishedDate);
    return { ...item, PublishedDate: PublishedDate, key: item.Key };
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

export default QuestionCategoryTableData;
