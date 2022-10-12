import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedNewsFieldPage.module.scss';
import classNames from 'classnames/bind';
import publishedNewsApi from 'apis/published/publishedNewsApi';
import commonRender, { commonRenderTable } from 'common/commonRender';
import PublishedNewsListCategoryPageItem from '../PublishedNewsListCategoryPage/PublishedNewsListCategoryPageItem/PublishedNewsListCategoryPageItem';
import { Link } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import { Pagination } from 'antd';

const cx = classNames.bind(styles);

PublishedNewsFieldPage.propTypes = {};

PublishedNewsFieldPage.defaultProps = {};

function PublishedNewsFieldPage(props) {
    // const [dataPage, setDataPage] = useState();
    const [dataPageFullPage, setDataPageFullPage] = useState();
    // const [dataTotal, setDataTotal] = useState(0);
    const dataPage = useRef(null);
    const dataTotal = useRef(1);

    const [pagingIndex, setPagingIndex] = useState(1);

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = { currentPage: pagingIndex };
                const response = await publishedNewsApi.getFieldsDataPage(params);
                setDataPageFullPage(response);
                console.log('PublishedNewsFieldPage', response);
                // setDataPage(response?.data);
                // setDataTotal(response?.total);
                dataPage.current = response?.data?.category;
                dataTotal.current = response?.total;
            } catch (error) {
                console.log('Failed to fetch list: ', error);
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
            {dataPage.current && (
                <>
                    <div key={dataPage.current.categoryId} className={cx('category-container')}>
                        <div className={cx('title-container')}>
                            <Link to={commonRender.renderLinkNewsCategory(dataPage.current.categoryTitle)} className={cx('title')}>
                                {dataPage.current?.categoryTitle}
                            </Link>
                            <span className={cx('right')}></span>
                        </div>
                        <div style={{ border: '1px solid #0066b3', marginLeft: 8 }}></div>

                        {Array.isArray(dataPage.current?.items) &&
                            dataPage.current.items.map((dataItem, index) => {
                                return (
                                    <>
                                        <PublishedNewsListCategoryPageItem key={index} data={dataItem} isFirst={true} />
                                        <div className={cx('divider')}></div>
                                    </>
                                );
                            })}
                        <Pagination
                            className={cx('paging')}
                            defaultCurrent={pagingIndex}
                            total={dataTotal.current}
                            showTotal={() => commonRenderTable.showTableTotalPagination(dataTotal.current ?? 0)}
                            onChange={handleOnChangeIndexPaging}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default PublishedNewsFieldPage;
