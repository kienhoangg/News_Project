import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState } from 'react';
import NewsCollaboratorsPageSearch from './NewsCollaboratorsPageSearch/NewsCollaboratorsPageSearch';
import NewsCollaboratorsTableData from './NewsCollaboratorsTableData/NewsCollaboratorsTableData';

import classNames from 'classnames/bind';
import styles from './NewsCollaboratorsPage.module.scss';

const cx = classNames.bind(styles);

NewsCollaboratorsPage.propTypes = {};

NewsCollaboratorsPage.defaultProps = {};

function NewsCollaboratorsPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsCollaboratorsAll(params);
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
                <NewsCollaboratorsPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsCollaboratorsTableData data={newsData} />
            </div>
        </div>
    );
}

export default NewsCollaboratorsPage;
