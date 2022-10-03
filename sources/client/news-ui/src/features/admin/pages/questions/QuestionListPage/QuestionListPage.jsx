import { Divider } from 'antd';
import questionApi from 'apis/questionApi';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './QuestionListPage.module.scss';
import QuestionListPageSearch from './QuestionListPageSearch/QuestionListPageSearch';
import QuestionListTableData from './QuestionListTableData/QuestionListTableData';

const cx = classNames.bind(styles);

QuestionListPage.propTypes = {};

QuestionListPage.defaultProps = {};

function QuestionListPage(props) {
    const [newsData, setNewsData] = useState({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await questionApi.getAll(params);
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
                <QuestionListPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <QuestionListTableData data={newsData} />
            </div>
        </div>
    );
}

export default QuestionListPage;
