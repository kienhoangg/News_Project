import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './NewsSourcePage.module.scss';
import NewsSourcePageSearch from './NewsSourcePageSearch/NewsSourcePageSearch';
import NewsSourceTableData from './NewsSourceTableData/NewsSourceTableData';

const cx = classNames.bind(styles);

NewsSourcePage.propTypes = {};

NewsSourcePage.defaultProps = {};

function NewsSourcePage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsSourceAll(params);
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
                <NewsSourcePageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsSourceTableData data={newsData} />
            </div>
        </div>
    );
}

export default NewsSourcePage;
