import { Divider } from "antd";
import documentApi from "apis/documentApi";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from "./QuestionCategoryPage.module.scss";
import QuestionCategoryPageSearch from "./QuestionCategoryPageSearch/QuestionCategoryPageSearch";
import questionApi from "apis/questionApi";
import QuestionCategoryTableData from "./QuestionCategoryTableData/QuestionCategoryTableData";

const cx = classNames.bind(styles);

QuestionCategoryPage.propTypes = {};

QuestionCategoryPage.defaultProps = {};

function QuestionCategoryPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await questionApi.getCategoryAll(params);
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
        <QuestionCategoryPageSearch />
      </div>
      <Divider style={{ margin: "0" }} />
      <div className={cx("table-data")}>
        <QuestionCategoryTableData data={newsData} />
      </div>
    </div>
  );
}

export default QuestionCategoryPage;