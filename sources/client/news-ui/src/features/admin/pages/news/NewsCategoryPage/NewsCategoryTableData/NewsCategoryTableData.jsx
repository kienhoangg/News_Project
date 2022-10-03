import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import PropTypes from 'prop-types';
import { commonRenderTable } from 'common/commonRender';
import datetimeHelper from 'helpers/datetimeHelper';
import styles from './NewsCategoryTableData.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsCategoryTableData.propTypes = {
    data: PropTypes.shape({
        Title: PropTypes.string,
        OrderNumber: PropTypes.number,
        Status: PropTypes.bool,
    }),
    onClickShowRowDetail: PropTypes.func,
};

NewsCategoryTableData.defaultProps = {};

function NewsCategoryTableData(props) {
    const { data, onClickShowRowDetail } = props;

    const handleOnClickTitle = (values) => {
        if (onClickShowRowDetail) onClickShowRowDetail(values);
    };

    const columns = [
        {
            key: 'title',
            dataIndex: 'Title',
            title: 'Tiêu đề',
            render: (_, { Id, Title }) => (
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        handleOnClickTitle({ Id, Title });
                    }}
                >
                    {Title}
                </div>
            ),
            sorter: (a, b) => a.title - b.title,
        },
        {
            key: 'OrderNumber',
            dataIndex: 'OrderNumber',
            title: 'Số thứ tự',
            render: (OrderNumber) => <>{OrderNumber}</>,
            sorter: (a, b) => a.OrderNumber - b.OrderNumber,
            width: 100,
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
                    <Tag color={color} key={Id} style={{ cursor: 'pointer' }} onClick={() => handleOnClickStatus({ Id, Status })}>
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
                    showTotal: () => commonRenderTable.showTableTotalPagination(data?.total ?? 0),
                }}
                dataSource={dataItems}
                size='small'
            />
        </div>
    );
}

export default NewsCategoryTableData;
