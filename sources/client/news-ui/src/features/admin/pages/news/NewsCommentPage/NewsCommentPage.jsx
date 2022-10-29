import classNames from "classnames/bind";
import styles from "./NewsCommentPage.module.scss";

import { Divider, Form, Modal, Button } from "antd";
import newsApi from "apis/newsApi";
import { useEffect, useState } from "react";
import NewsCommentPageSearch from "./NewsCommentPageSearch/NewsCommentPageSearch";
import NewsCommentTableData from "./NewsCommentTableData/NewsCommentTableData";
import { Direction, NotificationType } from "common/enum";
import axiosClient from "apis/axiosClient";
import { TypeUpdate } from "common/constant";
import { openNotification } from "helpers/notification";
import moment from "moment";
import datetimeHelper from "helpers/datetimeHelper";

const cx = classNames.bind(styles);

NewsCommentPage.propTypes = {};

NewsCommentPage.defaultProps = {};

function NewsCommentPage(props) {
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: "CreatedDate",
    keyword: "",
  });
  const [newsData, setNewsData] = useState({
    data: [],
    total: 0,
  });

  useEffect(() => {
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      const response = await axiosClient.post("/comments/filter", objFilter);

      setNewsData({
        data: response?.PagedData?.Results,
        total: response?.PagedData?.RowCount,
      });
    } catch (error) {
      console.log("Failed to fetch list: ", error);
    }
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  /**
   * Thay đổi phân trang
   */
  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction
  ) => {
    setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await axiosClient.put("/comments", {
        ids: [values.Id],
        value: values.Status === 0,
        field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification("Cập nhật thành công");
    } catch (error) {
      openNotification("Cập nhật thất bại", "", NotificationType.ERROR);
    }
  };

  const handleDeleteCategoryNew = async (res) => {
    try {
      await axiosClient.delete("/comments/" + res?.Id);
      openNotification("Xóa bình luận thành công");
      fetchProductList();
    } catch (error) {
      openNotification("Xóa bình luận thất bại", "", NotificationType.ERROR);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState({
    comment: null,
    show: false,
  });

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  console.log(isModalOpen);

  return (
    <div className={cx("wrapper")}>
      <Modal
        open={isModalOpen?.show}
        title={"Hiển thị thông tin"}
        okText={false}
        okButtonProps={{
          hidden: true,
        }}
        cancelText="Thoát"
        onCancel={() => {
          setIsModalOpen({
            comment: null,
            show: false,
          });
        }}
      >
        <Form form={form} {...layout} name="control-hooks">
          <Form.Item label="Thuộc tin">
            <div>{isModalOpen?.comment?.NewsContent}</div>
          </Form.Item>

          <Form.Item label="Người gửi">
            <div>{isModalOpen?.comment?.Username}</div>
          </Form.Item>

          <Form.Item label="Nội dung">
            <div>{isModalOpen?.comment?.Content}</div>
          </Form.Item>

          <Form.Item label="Ngày gửi">
            <div>
              {datetimeHelper.formatDateToDateVN(
                isModalOpen?.comment?.CreatedDateRaw
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <div className={cx("top")}>
        <NewsCommentPageSearch setTextSearch={handleChangeTextSearch} />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <NewsCommentTableData
          data={newsData}
          setPagination={handleChangePagination}
          updateStatusNew={handleUpdateStatusNew}
          deleteCategoryNew={handleDeleteCategoryNew}
          onClickRow={(item) => {
            setIsModalOpen({
              comment: item,
              show: true,
            });
          }}
        />
      </div>
    </div>
  );
}

export default NewsCommentPage;
