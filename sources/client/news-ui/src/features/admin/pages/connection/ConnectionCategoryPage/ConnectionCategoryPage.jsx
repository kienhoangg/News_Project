import { Divider } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ConnectionCategoryPage.module.scss';
import ConnectionCategoryPageSearch from './ConnectionCategoryPageSearch/ConnectionCategoryPageSearch';
import ConnectionCategoryTableData from './ConnectionCategoryTableData/ConnectionCategoryTableData';

const cx = classNames.bind(styles);

ConnectionCategoryPage.propTypes = {};

ConnectionCategoryPage.defaultProps = {};

function ConnectionCategoryPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        // const response = await connectionApi.getConnectionCategoryAll(params);
        // setNewsData(response);
      } catch (error) {
        console.log('Failed to fetch list: ', error);
      }
    };
    fetchProductList();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('top')}>
        <ConnectionCategoryPageSearch />
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <ConnectionCategoryTableData data={newsData} />
      </div>
    </div>
  );
}

export default ConnectionCategoryPage;
