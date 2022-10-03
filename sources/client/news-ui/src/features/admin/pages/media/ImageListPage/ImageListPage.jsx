import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import ImageListPageSearch from './ImageListPageSearch/ImageListPageSearch';
import ImageListTableData from './ImageListTableData/ImageListTableData';

import mediaApi from 'apis/mediaApi';
import classNames from 'classnames/bind';
import styles from './ImageListPage.module.scss';

const cx = classNames.bind(styles);

ImageListPage.propTypes = {};

ImageListPage.defaultProps = {};

function ImageListPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await mediaApi.getImageAll(params);
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
                <ImageListPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <ImageListTableData data={newsData} />
            </div>
        </div>
    );
}

export default ImageListPage;
