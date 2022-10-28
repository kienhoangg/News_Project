import { Divider } from 'antd';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './CompanyCategoryPage.module.scss';
import CompanyCategoryPageSearch from './CompanyCategoryPageSearch/CompanyCategoryPageSearch';
import CompanyCategoryTableData from './CompanyCategoryTableData/CompanyCategoryTableData';
import advertisementApi from 'apis/advertisementApi';

const cx = classNames.bind(styles);

CompanyCategoryPage.propTypes = {};

CompanyCategoryPage.defaultProps = {};

function CompanyCategoryPage(props) {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const params = {
          _page: 1,
          _limit: 10,
        };
        const response = await advertisementApi.getAdvertisementCategoryAll(
          params
        );
        setNewsData(response);
      } catch (error) {
        console.log('Failed to fetch list: ', error);
      }
    };
    fetchProductList();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('top')}>
        <CompanyCategoryPageSearch />
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <CompanyCategoryTableData data={newsData} />
      </div>
    </div>
  );
}

export default CompanyCategoryPage;
