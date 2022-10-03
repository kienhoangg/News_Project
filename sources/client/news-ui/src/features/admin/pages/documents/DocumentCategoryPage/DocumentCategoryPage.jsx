import { Divider } from "antd";
import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./DocumentCategoryPage.module.scss";
import DocumentCategoryPageSearch from "./DocumentCategoryPageSearch/DocumentCategoryPageSearch";
import DocumentCategoryTableData from "./DocumentCategoryTableData/DocumentCategoryTableData";

const cx = classNames.bind(styles);

DocumentCategoryPage.propTypes = {};

DocumentCategoryPage.defaultProps = {};

function DocumentCategoryPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await documentApi.getDocumentCategoryAll(params);
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
        <DocumentCategoryPageSearch />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <DocumentCategoryTableData data={newsData} />
      </div>
    </div>
  );
}

export default DocumentCategoryPage;