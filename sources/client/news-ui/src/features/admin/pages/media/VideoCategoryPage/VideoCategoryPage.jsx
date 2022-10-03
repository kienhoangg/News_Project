import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import VideoCategoryPageSearch from './VideoCategoryPageSearch/VideoCategoryPageSearch';
import VideoCategoryTableData from './VideoCategoryTableData/VideoCategoryTableData';

import classNames from 'classnames/bind';
import styles from './VideoCategoryPage.module.scss';
import mediaApi from 'apis/mediaApi';

const cx = classNames.bind(styles);

VideoCategoryPage.propTypes = {};

VideoCategoryPage.defaultProps = {};

function VideoCategoryPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await mediaApi.getVideoCategoryAll(params);
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
                <VideoCategoryPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <VideoCategoryTableData data={newsData} />
            </div>
        </div>
    );
}

export default VideoCategoryPage;
