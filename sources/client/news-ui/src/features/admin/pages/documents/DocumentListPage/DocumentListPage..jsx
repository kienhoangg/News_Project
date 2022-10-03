import { Divider } from "antd";
import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./DocumentListPage.module.scss";
import DocumentListPageSearch from "./DocumentListPageSearch/DocumentListPageSearch";
import DocumentListTableData from "./DocumentListTableData/DocumentListTableData";

const cx = classNames.bind(styles);

DocumentListPage.propTypes = {};

DocumentListPage.defaultProps = {};

function DocumentListPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await documentApi.getDocumentAll(params);
        setNewsData(response);
      } catch (error) {
        console.log("Failed to fetch list: ", error);
      }
    };
    fetchProductList();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("top")}>
        <DocumentListPageSearch />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <DocumentListTableData data={newsData} />
      </div>
    </div>
  );
}

export default DocumentListPage;
