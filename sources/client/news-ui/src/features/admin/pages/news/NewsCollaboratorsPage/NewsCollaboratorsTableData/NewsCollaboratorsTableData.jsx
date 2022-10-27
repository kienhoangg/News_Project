import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import classNames from 'classnames/bind';
import styles from './NewsCollaboratorsTableData.module.scss';

const cx = classNames.bind(styles);

NewsCollaboratorsTableData.propTypes = {};

NewsCollaboratorsTableData.defaultProps = {};

function NewsCollaboratorsTableData(props) {
  const { data } = props;

  const columns = [
    {
      key: 'title',
      dataIndex: 'Title',
      title: 'Tiêu đề',
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: 'UserName',
      dataIndex: 'UserName',
      title: 'Tên đăng nhập',
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.UserName - b.UserName,
      width: 150,
    },
    {
      key: 'AuthorAlias',
      dataIndex: 'AuthorAlias',
      title: 'Bút danh',
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.AuthorAlias - b.AuthorAlias,
      width: 150,
    },
    {
      key: 'Organization',
      dataIndex: 'Organization',
      title: 'Cơ quan',
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.Organization - b.Organization,
      width: 200,
    },
    {
      key: 'status',
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
    var createdDate = datetimeHelper.formatDateToDateVN(item.CreatedDate);
    return { ...item, CreatedDate: createdDate, key: item.Key };
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

export default NewsCollaboratorsTableData;
