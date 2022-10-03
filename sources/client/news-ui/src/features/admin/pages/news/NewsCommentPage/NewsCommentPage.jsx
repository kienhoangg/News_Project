import classNames from 'classnames/bind';
import styles from './NewsCommentPage.module.scss';

import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import NewsCommentPageSearch from './NewsCommentPageSearch/NewsCommentPageSearch';
import NewsCommentTableData from './NewsCommentTableData/NewsCommentTableData';

const cx = classNames.bind(styles);

NewsCommentPage.propTypes = {};

NewsCommentPage.defaultProps = {};

function NewsCommentPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsCommentAll(params);
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
                <NewsCommentPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsCommentTableData data={newsData} />
            </div>
        </div>
    );
}

export default NewsCommentPage;
