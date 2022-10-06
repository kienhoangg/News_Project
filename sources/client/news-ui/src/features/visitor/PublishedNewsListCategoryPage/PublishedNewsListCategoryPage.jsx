import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedNewsListCategoryPage.module.scss';
import classNames from 'classnames/bind';
import { Breadcrumb } from 'antd';
import publishedNewsApi from 'apis/published/publishedNewsApi';
import { Link } from 'react-router-dom';
import commonRender from 'common/commonRender';
import PublishedNewsListCategoryPageItem from './PublishedNewsListCategoryPageItem/PublishedNewsListCategoryPageItem';

const cx = classNames.bind(styles);

PublishedNewsListCategoryPage.propTypes = {
    data: PropTypes.object,
};

PublishedNewsListCategoryPage.defaultProps = {};

function PublishedNewsListCategoryPage(props) {
    const [dataPage, setDataPage] = useState();

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = {};
                const response = await publishedNewsApi.getCategoriesDataListPage(params);
                setDataPage(response);
                console.log('PublishedNewsListCategoryPage', response);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchHome();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {Array.isArray(dataPage) &&
                dataPage.map((item) => {
                    return (
                        <div key={item.categoryId} className={cx('category-container')}>
                            <Link to={commonRender.renderLinkNewsCategory(item.categoryId)} className={cx('title')}>
                                {item.categoryTitle}
                            </Link>
                            <div style={{ border: '1px solid #0066b3', marginLeft: 8 }}></div>

                            {Array.isArray(item?.items) &&
                                item.items.map((dataItem) => {
                                    return (
                                        <>
                                            <PublishedNewsListCategoryPageItem key={dataItem.id} data={dataItem} />
                                            <div className={cx('divider')}></div>
                                        </>
                                    );
                                })}
                        </div>
                    );
                })}
        </div>
    );
}

export default PublishedNewsListCategoryPage;
