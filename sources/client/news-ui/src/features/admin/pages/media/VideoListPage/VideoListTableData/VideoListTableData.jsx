import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Space, Table, Tag } from "antd";
import { commonRenderTable } from "common/commonRender";
import datetimeHelper from "helpers/datetimeHelper";
import classNames from "classnames/bind";
import styles from "./VideoListTableData.module.scss";
import { Direction, NotificationType } from "common/enum";
import { openNotification } from "helpers/notification";
import commonFunc from "common/commonFunc";
import { Role } from "common/constant";

const cx = classNames.bind(styles);

VideoListTableData.propTypes = {};

VideoListTableData.defaultProps = {};

function VideoListTableData(props) {
  const { data, onEdit, setPagination, updateStatusNew, deleteCategoryNew } =
    props;

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {
    setPagination(
      pagination.current,
      pagination.pageSize,
      sorter.columnKey,
      sorter.Order === "ascend" ? Direction.ASC : Direction.DESC
    );
  };

  const columns = [
    {
      key: "title",
      dataIndex: "Title",
      title: "Tiêu đề",
      render: (text) => <div>{text}</div>,
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: "status",
      dataIndex: "Status",
      title: "Trạng thái",
      align: "center",
      width: 100,
      sorter: (a, b) => true,
      render: (_, { Id, Status }) => {
        let color = Status ? "geekblue" : "volcano";
        let text = Status ? "Duyệt" : "Hủy duyệt";
        return (
          <Tag
            color={color}
            key={Id}
            style={{ cursor: "pointer" }}
            onClick={() => handleOnClickStatus({ Id, Status })}
          >
            {text}
          </Tag>
        );
      },
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => onEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="ghost"
            danger
            icon={<DeleteFilled />}
            onClick={() => {
              const role = commonFunc.getCookie("role");
              if (role !== Role.ADMIN) {
                openNotification(
                  <>
                    Chỉ có <b>ADMIN</b> mới thực hiện được hành động này
                  </>,
                  "",
                  NotificationType.ERROR
                );
                return;
              }
              Modal.confirm({
                title: "Xóa video",
                icon: <ExclamationCircleOutlined />,
                content: (
                  <>
                    Bạn có chắc chắn <b>Xóa</b> không?
                  </>
                ),
                okText: "Xóa",
                cancelText: "Hủy",
                onOk: () => {
                  if (!deleteCategoryNew) {
                    return;
                  }
                  deleteCategoryNew(record);
                },
              });
            }}
          >
            Xóa
          </Button>
        </Space>
      ),
      width: 120,
    },
  ];

  let dataItems = data?.length ? data : [];
  dataItems = dataItems.map((item) => {
    var PublishedDate = datetimeHelper.formatDateToDateVN(item.PublishedDate);
    return { ...item, PublishedDate: PublishedDate, key: item.Key };
  });

  function handleOnClickStatus(values) {
    const role = commonFunc.getCookie("role");
    if (role !== Role.ADMIN) {
      openNotification(
        <>
          Chỉ có <b>ADMIN</b> mới thực hiện được hành động này
        </>,
        "",
        NotificationType.ERROR
      );
      return;
    }
    Modal.confirm({
      title: "Cập nhật trạng thái",
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          Bạn có chắc chắn <b>DUYỆT/HỦY DUYỆT</b> không?
        </>
      ),
      okText: "Cập nhật",
      cancelText: "Hủy",
      onOk: () => {
        if (!updateStatusNew) {
          return;
        }
        updateStatusNew(values);
      },
    });
  }

  return (
    <div className={cx("wrapper")}>
      <Table
        onChange={handleOnchangeTable}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 30],
          showTotal: () =>
            commonRenderTable.showTableTotalPagination(data?.total ?? 0),
        }}
        dataSource={dataItems}
        size="small"
      />
    </div>
  );
}

export default VideoListTableData;
