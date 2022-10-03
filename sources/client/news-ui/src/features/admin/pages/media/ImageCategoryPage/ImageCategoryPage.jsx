import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import ImageCategoryPageSearch from './ImageCategoryPageSearch/ImageCategoryPageSearch';
import ImageCategoryTableData from './ImageCategoryTableData/ImageCategoryTableData';

import mediaApi from 'apis/mediaApi';
import classNames from 'classnames/bind';
import styles from './ImageCategoryPage.module.scss';

const cx = classNames.bind(styles);

ImageCategoryPage.propTypes = {};

ImageCategoryPage.defaultProps = {};

function ImageCategoryPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await mediaApi.getImageCategoryAll(params);
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
                <ImageCategoryPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <ImageCategoryTableData data={newsData} />
            </div>
        </div>
    );
}

export default ImageCategoryPage;
