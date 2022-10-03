import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import NewsHotPageSearch from './NewsHotPageSearch/NewsHotPageSearch';
import NewsHotTableData from './NewsHotTableData/NewsHotTableData';

import classNames from 'classnames/bind';
import styles from './NewsHotPage.module.scss';

const cx = classNames.bind(styles);

NewsHotPage.propTypes = {};

NewsHotPage.defaultProps = {};

function NewsHotPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsHotAll(params);
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
                <NewsHotPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsHotTableData data={newsData} />
            </div>
        </div>
    );
}

export default NewsHotPage;
