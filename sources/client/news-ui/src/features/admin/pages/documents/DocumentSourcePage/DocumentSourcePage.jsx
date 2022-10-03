import { Divider } from "antd";
import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./DocumentSourcePage.module.scss";
import DocumentSourcePageSearch from "./DocumentSourcePageSearch/DocumentSourcePageSearch";
import DocumentSourceTableData from "./DocumentSourceTableData/DocumentSourceTableData";

const cx = classNames.bind(styles);

DocumentSourcePage.propTypes = {};

DocumentSourcePage.defaultProps = {};

function DocumentSourcePage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await documentApi.getDocumentSourceAll(params);
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
        <DocumentSourcePageSearch />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <DocumentSourceTableData data={newsData} />
      </div>
    </div>
  );
}

export default DocumentSourcePage;