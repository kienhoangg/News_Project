import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import NewsFieldPageSearch from './NewsFieldPageSearch/NewsFieldPageSearch';
import NewsFieldTableData from './NewsFieldTableData/NewsFieldTableData';
import styles from './NewsFieldPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

NewsFieldPage.propTypes = {};

NewsFieldPage.defaultProps = {};

function NewsFieldPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsFieldAll(params);
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
                <NewsFieldPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsFieldTableData data={newsData} />
            </div>
        </div>
    );
}

export default NewsFieldPage;
