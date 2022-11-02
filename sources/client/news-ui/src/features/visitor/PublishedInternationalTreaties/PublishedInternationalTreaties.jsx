import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedInternationalTreaties.module.scss';
import classNames from 'classnames/bind';
import publishedNewsApi from 'apis/published/publishedNewsApi';
import commonRender, { commonRenderTable } from 'common/commonRender';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import { Pagination, Skeleton } from 'antd';
import stringHelper from 'helpers/stringHelper';
import PublishedNewsListCategoryPageItem from './../PublishedNewsListCategoryPage/PublishedNewsListCategoryPageItem/PublishedNewsListCategoryPageItem';
import config from 'config/config';

const cx = classNames.bind(styles);

PublishedInternationalTreaties.propTypes = {};

function PublishedInternationalTreaties(props) {
  const [loading, setLoading] = useState(true);

  const [dataPageFullPage, setDataPageFullPage] = useState();
  const dataPage = useRef(null);
  const dataTotal = useRef(1);

  const [pagingIndex, setPagingIndex] = useState(1);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const params = { currentPage: pagingIndex, id: 1 };
        const response = await publishedNewsApi.getInternationalTreatiesPage(
          params
        );
        setDataPageFullPage(response);
        dataPage.current = response?.CategoryNews;
        dataTotal.current = response?.NewsPosts.RowCount;
      } catch (error) {
        console.log('Failed to fetch list: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, [pagingIndex]);

  function handleOnChangeIndexPaging(params) {
    setPagingIndex(params);
  }

  return (
    <div className={cx('wrapper')}>
      <ScrollToTop />
      <Skeleton loading={loading} active>
        <>
          {dataPage.current && (
            <>
              <div
                key={dataPage.current?.CategoryId}
                className={cx('category-container')}
              >
                <div className={cx('title-container')}>
                  <Link
                    to={config.routes.publishedNewsPostCategory}
                    className={cx('title')}
                  >
                    Điều ước quốc tế
                  </Link>
                  <span className={cx('right')}></span>
                </div>
                <div
                  style={{ border: '1px solid #0066b3', marginLeft: 8 }}
                ></div>

                {Array.isArray(dataPageFullPage?.NewsPosts?.Results) &&
                  dataPageFullPage.NewsPosts.Results.map((dataItem, index) => {
                    return (
                      <div key={index}>
                        <PublishedNewsListCategoryPageItem
                          data={dataItem}
                          isFirst={true}
                        />
                        <div className={cx('divider')}></div>
                      </div>
                    );
                  })}
                <Pagination
                  className={cx('paging')}
                  defaultCurrent={pagingIndex}
                  total={dataTotal.current}
                  showTotal={() =>
                    commonRenderTable.showTableTotalPagination(
                      dataTotal.current ?? 0
                    )
                  }
                  onChange={handleOnChangeIndexPaging}
                />
              </div>
            </>
          )}
        </>
      </Skeleton>
    </div>
  );
}

export default PublishedInternationalTreaties;
