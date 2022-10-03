import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import CollectionNewsDetail from './CollectionNewsDetail/CollectionNewsDetail';
import CollectionNewsEditor from './CollectionNewsEditor/CollectionNewsEditor';
import NewsListMenuSearch from './NewsListMenuSearch/NewsListMenuSearch';
import styles from './NewsListPage.module.scss';
import NewsListTableData from './NewsListTableData/NewsListTableData';

const cx = classNames.bind(styles);

NewsListPage.propTypes = {};

NewsListPage.defaultProps = {};

function NewsListPage(props) {
    const [newsData, setNewsData] = useState({});

    const [openCollectionEditor, setOpenCollectionEditor] = useState(false);
    const [openCollectionNewsDetail, setOpenCollectionNewsDetail] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const dataDetail = useRef({});

    const onCreate = (values) => {
        console.log('Received values of form: ', values);
        setOpenCollectionEditor(false);
    };

    const handleOnClickShowRowDetail = (values) => {
        // alert(JSON.stringify(values));

        const fetchItem = async () => {
            setConfirmLoading(true);

            try {
                const params = { Id: values?.Id };
                const response = await newsApi.getNewsById(params);
                dataDetail.current = response;
                setConfirmLoading(false);
                setOpenCollectionNewsDetail(true);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };

        fetchItem();
    };

    /**
     * Khởi tạo dữ liệu
     */
    useEffect(() => {
        const fetchList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsAll(params);
                setNewsData(response);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchList();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <NewsListMenuSearch setOpenCollectionEditor={setOpenCollectionEditor} />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsListTableData data={newsData} onClickShowRowDetail={handleOnClickShowRowDetail} />
            </div>
            <CollectionNewsEditor
                open={openCollectionEditor}
                onCreate={onCreate}
                onCancel={() => {
                    setOpenCollectionEditor(false);
                }}
            />
            <CollectionNewsDetail
                data={dataDetail.current}
                open={openCollectionNewsDetail}
                onCreate={onCreate}
                onCancel={() => {
                    setOpenCollectionNewsDetail(false);
                }}
            />
        </div>
    );
}

export default NewsListPage;
