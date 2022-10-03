import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import VideoListPageSearch from './VideoListPageSearch/VideoListPageSearch';
import VideoListTableData from './VideoListTableData/VideoListTableData';

import mediaApi from 'apis/mediaApi';
import classNames from 'classnames/bind';
import styles from './VideoListPage.module.scss';

const cx = classNames.bind(styles);

VideoListPage.propTypes = {};

VideoListPage.defaultProps = {};

function VideoListPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await mediaApi.getVideoAll(params);
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
                <VideoListPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <VideoListTableData data={newsData} />
            </div>
        </div>
    );
}

export default VideoListPage;
