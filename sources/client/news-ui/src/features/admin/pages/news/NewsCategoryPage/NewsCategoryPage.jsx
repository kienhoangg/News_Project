import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useRef, useState } from 'react';
import NewsCategoryPageSearch from './NewsCategoryPageSearch/NewsCategoryPageSearch';
import NewsCategoryTableData from './NewsCategoryTableData/NewsCategoryTableData';
import styles from './NewsCategoryPage.module.scss';
import classNames from 'classnames/bind';
import AdminCollectionDetail from 'features/admin/components/AdminCollectionDetail/AdminCollectionDetail';

const cx = classNames.bind(styles);

NewsCategoryPage.propTypes = {};

NewsCategoryPage.defaultProps = {};

function NewsCategoryPage(props) {
    const [newsData, setNewsData] = useState({});

    const [openCollectionDetail, setOpenCollectionDetail] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const dataDetail = useRef({});

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const params = {
                    _page: 1,
                    _limit: 10,
                };
                const response = await newsApi.getNewsCategoryAll(params);
                setNewsData(response);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchProductList();
    }, []);

    const handleOnClickShowRowDetail = (values) => {
        // alert(JSON.stringify(values));

        const fetchItem = async () => {
            setConfirmLoading(true);

            try {
                const params = { Id: values?.Id };
                const response = await newsApi.getNewsCategoryById(params);
                debugger;
                var dicDetail = [
                    {
                        type: 'string',
                        label: 'Tiêu đề',
                        content: response?.Title,
                    },
                    {
                        type: 'string',
                        label: 'Danh mục cấp cha',
                        content: response?.ParentTitle ?? '',
                    },
                    {
                        type: 'number',
                        label: 'Số thứ tự',
                        content: response?.OrderNumber,
                    },
                    {
                        type: 'ID',
                        label: 'ID',
                        content: response?.Id,
                    },
                    {
                        type: 'datetime',
                        label: 'Ngày tạo',
                        content: response?.CreatedDate,
                    },
                    {
                        type: 'datetime',
                        label: 'Ngày sửa cuối',
                        content: response?.ModifiedDate,
                    },
                    {
                        type: 'string',
                        label: 'Người tạo',
                        content: response?.CreatedBy,
                    },
                    {
                        type: 'string',
                        label: 'Người sửa',
                        content: response?.ModifiedBy,
                    },
                    {
                        type: 'string',
                        label: 'File đính kèm',
                        content: response?.FileUrl,
                    },
                ];

                dataDetail.current = dicDetail;
                setConfirmLoading(false);
                setOpenCollectionDetail(true);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };

        fetchItem();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <NewsCategoryPageSearch />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className={cx('table-data')}>
                <NewsCategoryTableData data={newsData} onClickShowRowDetail={handleOnClickShowRowDetail} />
            </div>

            <AdminCollectionDetail
                listData={dataDetail.current}
                open={openCollectionDetail}
                onCancel={() => {
                    setOpenCollectionDetail(false);
                }}
            />
        </div>
    );
}

export default NewsCategoryPage;
