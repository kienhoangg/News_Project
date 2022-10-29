import { Divider, Button, Modal } from "antd";
import newsApi from "apis/newsApi";
import { useEffect, useState, useRef } from "react";
import NewsHotPageSearch from "./NewsHotPageSearch/NewsHotPageSearch";
import NewsHotTableData from "./NewsHotTableData/NewsHotTableData";

import classNames from "classnames/bind";
import styles from "./NewsHotPage.module.scss";
import { FileAddFilled } from "@ant-design/icons";
import { Direction, NotificationType } from "common/enum";
import { openNotification } from "helpers/notification";
import NewsHotTableDataPopUp from "./NewsHotTableDataPopUp/NewsHotTableDataPopUp";
import NewsHotPageSearchPopup from "./NewsHotPageSearchPopUp/NewsHotPageSearchPopUp";
import { TypeUpdate } from "common/constant";
import CollectionNewsEditor from "../NewsListPage/CollectionNewsEditor/CollectionNewsEditor";
import PopupUpdateNews from "../PopupUpdateNews/PopupUpdateNews";

const cx = classNames.bind(styles);

NewsHotPage.propTypes = {};

NewsHotPage.defaultProps = {};

function NewsHotPage(props) {
  const [newsData, setNewsData] = useState({});
  const [newsDataPopUp, setNewsDataPopUp] = useState({});
  const isFirstCall = useRef(true);
  const isChangePopUpNew = useRef(false);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: "CreatedDate",
    keyword: "",
    IsHotNews: true,
  });
  const [objFilterPopUp, setObjFilterPopUp] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: "CreatedDate",
    keyword: "",
    IsHotNews: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeRowKey, setChangeRowKey] = useState();
  useEffect(() => {
    // if (isFirstCall.current) {
    //   isFirstCall.current = false;
    //   return;
    // }
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      const response = await newsApi.getNewsAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      console.log("Failed to fetch list: ", error);
    }
  };

  /**
   * Thay đổi phân trang
   */
  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction,
    type
  ) => {
    if (type === "hotnews") {
      setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
    } else {
      isChangePopUpNew.current = true;
      setObjFilterPopUp({
        ...objFilterPopUp,
        currentPage,
        pageSize,
        orderBy,
        direction,
      });
    }
  };

  const handleDeleteSourceNew = async (id) => {
    try {
      await newsApi.deleteHotNew(id);
      openNotification("Xóa tin nổi bật thành công");
      fetchProductList();
    } catch (error) {
      openNotification("Xóa tin nổi bật thất bại", "", NotificationType.ERROR);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    fetchProductListPopUp();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    fetchProductList();
  };
  useEffect(() => {
    if (!isChangePopUpNew.current) {
      return;
    }
    fetchProductListPopUp();
  }, [objFilterPopUp]);

  const fetchProductListPopUp = async () => {
    try {
      const response = await newsApi.getNewsAll(objFilterPopUp);
      if (
        response?.PagedData?.Results?.length === 0 &&
        objFilterPopUp.currentPage > 1
      ) {
        setObjFilterPopUp({
          ...objFilterPopUp,
          currentPage: objFilterPopUp.currentPage - 1,
        });
        return;
      }
      setNewsDataPopUp({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      console.log("Failed to fetch list: ", error);
    }
  };

  const handleOK = () => {
    updateHotNews();
  };

  const updateHotNews = async () => {
    try {
      if (!changeRowKey) {
        openNotification(
          "Chưa chọn tin để cập nhật",
          "",
          NotificationType.ERROR
        );
      }
      await newsApi.updatNews({
        Ids: changeRowKey,
        Value: true,
        Field: TypeUpdate.IS_HOT_NEWS,
      });
      openNotification("Thêm thành công");
      fetchProductListPopUp();
    } catch (error) {
      openNotification("Thêm thành thất bại");
      console.log("Failed to fetch list: ", error);
    }
  };

  const handleChangeRowKey = (value) => {
    setChangeRowKey(value);
  };

  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch, type) => {
    if (type === "hotnews") {
      setObjFilter({ ...objFilter, keyword: textSearch });
    } else {
      isChangePopUpNew.current = true;
      setObjFilterPopUp({ ...objFilterPopUp, keyword: textSearch });
    }
  };

  const handleUpdateStatusNew = async (values) => {
    try {
      await newsApi.updatNews({
        Ids: [values.Id],
        Value: values.Status === 0 ? 1 : 0,
        Field: TypeUpdate.STATUS,
      });
      fetchProductList();
      openNotification("Cập nhật thành công");
    } catch (error) {
      openNotification("Cập nhật thất bại", "", NotificationType.ERROR);
    }
  };

  const handleCancelNewsHot = async (res) => {
    try {
      await newsApi.updatNews({
        Ids: [res?.Id],
        Value: false,
        Field: TypeUpdate.IS_HOT_NEWS,
      });
      fetchProductList();
      openNotification("Cập nhật thành công");
    } catch (error) {
      openNotification("Cập nhật thất bại", "", NotificationType.ERROR);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        className={cx("modal-insert-source-news")}
        title="Thêm mới nguồn tin tức"
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        width={"70vw"}
      >
        <div className={cx("top")}>
          <NewsHotPageSearchPopup setTextSearch={handleChangeTextSearch} />
        </div>
        <Divider style={{ marginBottom: "12px" }} />
        <div className={cx("table-data")}>
          <NewsHotTableDataPopUp
            data={newsDataPopUp}
            setPagination={handleChangePagination}
            changeRowKey={handleChangeRowKey}
          />
        </div>
      </Modal>

      <div className={cx("top")}>
        <NewsHotPageSearch setTextSearch={handleChangeTextSearch} />
        <div className={cx("btn-add-source-news")}>
          <Button type="primary" icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <NewsHotTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
          updateStatusNew={handleUpdateStatusNew}
          cancelNewsHost={handleCancelNewsHot}
        />
      </div>
    </div>
  );
}

export default NewsHotPage;
