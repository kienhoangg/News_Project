import { Divider } from "antd";
import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./DocumentFieldPage.module.scss";
import DocumentFieldPageSearch from "./DocumentFieldPageSearch/DocumentFieldPageSearch";
import DocumentFieldTableData from "./DocumentFieldTableData/DocumentFieldTableData";

const cx = classNames.bind(styles);

DocumentFieldPage.propTypes = {};

DocumentFieldPage.defaultProps = {};

function DocumentFieldPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await documentApi.getDocumentFieldAll(params);
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
        <DocumentFieldPageSearch />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <DocumentFieldTableData data={newsData} />
      </div>
    </div>
  );
}

export default DocumentFieldPage;
