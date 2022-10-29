import {
  DeleteFilled,
  EditFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tag, Modal } from "antd";
import { commonRenderTable } from "common/commonRender";
import datetimeHelper from "helpers/datetimeHelper";
import classNames from "classnames/bind";
import styles from "./DocumentSignerTableData.module.scss";
import { Direction } from "common/enum";
import { PropTypes } from "prop-types";
import commonFunc from "common/commonFunc";
import { Role } from "common/constant";
import { openNotification } from "helpers/notification";
import { NotificationType } from "common/enum";

const cx = classNames.bind(styles);

DocumentSignerTableData.propTypes = {
  /**
   * Func thay đổi phân trang
   */
  setPagination: PropTypes.func,

  /**
   * Xóa nguồn tin
   */
  deleteSourceNew: PropTypes.func,
};

DocumentSignerTableData.defaultProps = {
  setPagination: () => {},
  deleteSourceNew: () => {},
};

function DocumentSignerTableData(props) {
  const {
    data,
    setPagination,
    deleteSourceNew,
    updateStatusNew,
    onEdit,
    onClickRow,
  } = props;

  const columns = [
    {
      key: "title",
      dataIndex: "Title",
      title: "Tiêu đề",
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.title - b.title,
    },
    {
      key: "Order",
      dataIndex: "Order",
      title: "Số thứ tự",
      render: (Order) => <>{Order}</>,
      sorter: (a, b) => a.Order - b.Order,
      width: 100,
      align: "right",
    },
    {
      key: "status",
      dataIndex: "Status",
      title: "Trạng thái",
      width: 100,
      sorter: (a, b) => true,
      render: (_, { Id, Status }) => {
        let color = !Status ? "geekblue" : "volcano";
        let text = !Status ? "Duyệt" : "Hủy duyệt";
        return (
          <Tag
            color={color}
            key={Id}
            style={{ cursor: "pointer" }}
            onClick={(event) => {
              handleOnClickStatus({ Id, Status });
              event?.stopPropagation();
            }}
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
            onClick={(event) => {
              onEdit && onEdit(record);
              event?.stopPropagation();
            }}
          >
            Sửa
          </Button>
          <Button
            type="ghost"
            onClick={(event) => {
              handleDeleteSourceNew(record);
              event?.stopPropagation();
            }}
            danger
            icon={<DeleteFilled />}
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
    var PublishedDate = datetimeHelper.formatDateToDateVN(item.PublishedDate);
    return { ...item, PublishedDate: PublishedDate, key: item.Id };
  });

  function handleChangeSourceNew(values) {
    console.log(values);
  }

  function handleDeleteSourceNew(values) {
    if (values.Status) {
      openNotification("Hủy duyệt trước khi xóa", "", NotificationType.ERROR);
      return;
    }
    return Modal.confirm({
      title: "Xóa nguồn tin",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn xóa không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => deleteSourceNewCustom(values),
    });
  }

  const deleteSourceNewCustom = (values) => {
    if (!deleteSourceNew) {
      return;
    }
    deleteSourceNew(values.Id);
  };

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

  const handleOnchangeTable = (pagination, filters, sorter, extra) => {
    setPagination(
      pagination.current,
      pagination.pageSize,
      sorter.columnKey,
      sorter.order === "ascend" ? Direction.ASC : Direction.DESC
    );
  };

  return (
    <div className={cx("wrapper")}>
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
        size="small"
        onRow={(item) => ({
          onClick: () => onClickRow && onClickRow(item),
        })}
      />
    </div>
  );
}

export default DocumentSignerTableData;
