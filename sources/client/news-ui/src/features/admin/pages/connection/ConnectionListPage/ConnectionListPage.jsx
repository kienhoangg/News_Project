import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import ConnectionListPageSearch from './ConnectionListPageSearch/ConnectionListPageSearch';
import ConnectionTableData from './ConnectionTableData/ConnectionTableData';

import classNames from 'classnames/bind';
import styles from './ConnectionListPage.module.scss';
import connectionApi from 'apis/ConnectionApi';

const cx = classNames.bind(styles);

ConnectionListPage.propTypes = {};

ConnectionListPage.defaultProps = {};

function ConnectionListPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await connectionApi.getConnectionAll(params);
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
                <ConnectionListPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <ConnectionTableData data={newsData} />
            </div>
        </div>
    );
}

export default ConnectionListPage;
