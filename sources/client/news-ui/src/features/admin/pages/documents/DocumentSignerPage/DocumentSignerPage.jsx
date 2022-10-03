import { Divider } from "antd";
import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./DocumentSignerPage.module.scss";
import DocumentSignerPageSearch from "./DocumentSignerPageSearch/DocumentSignerPageSearch";
import DocumentSignerTableData from "./DocumentSignerTableData/DocumentSignerTableData";

const cx = classNames.bind(styles);

DocumentSignerPage.propTypes = {};

DocumentSignerPage.defaultProps = {};

function DocumentSignerPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await documentApi.getDocumentSingerAll(params);
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
        <DocumentSignerPageSearch />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <DocumentSignerTableData data={newsData} />
      </div>
    </div>
  );
}

export default DocumentSignerPage;