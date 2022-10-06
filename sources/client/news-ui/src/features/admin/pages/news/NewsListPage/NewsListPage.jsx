import { Divider } from 'antd';
import newsApi from 'apis/newsApi';
import classNames from 'classnames/bind';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
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
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
  });
  const isFirstCall = useRef(true);

  const [openCollectionEditor, setOpenCollectionEditor] = useState(false);
  const [openCollectionNewsDetail, setOpenCollectionNewsDetail] =
    useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const dataDetail = useRef({});
  const action = useRef('create');

  const onCreate = async (values) => {
    try {
      console.log('Received values of form: ', values);
      setOpenCollectionEditor(false);
      await newsApi.insertNew(values);
      openNotification('Tạo mới tin thành công');
      fetchList();
    } catch (error) {
      openNotification('Tạo mới tin thất bại', '', NotificationType.ERROR);
    }
  };

  const handleOnClickShowRowDetail = async (values) => {
    const detailRow = await fetchItem(values);
    if (!detailRow) {
      return;
    }
    dataDetail.current = detailRow;
    setConfirmLoading(false);
    setOpenCollectionNewsDetail(true);
  };

  const handleOnClickEditOneRow = async (values) => {
    const detailRow = await fetchItem(values);
    if (!detailRow) {
      return;
    }
    dataDetail.current = detailRow;
    setConfirmLoading(false);
    setOpenCollectionEditor(true);
  };

  const fetchItem = async (values) => {
    setConfirmLoading(true);

    try {
      const params = { Id: values?.Id };
      return await newsApi.getNewsById(params);
    } catch (error) {
      console.log('Failed to fetch list: ', error);
      return null;
    }
  };

  const fetchList = async () => {
    try {
      const response = await newsApi.getNewsAll(objFilter);
      setNewsData({
        data: response?.pagedData?.results ?? [],
        total: response?.pagedData?.rowCount ?? 0,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  /**
   * Thay đổi phân trang
   */
  const handleChangePagination = (
    currentPage,
    pageSize,
    orderBy,
    direction
  ) => {
    setObjFilter({ ...objFilter, currentPage, pageSize, orderBy, direction });
  };
  /**
   * Sử lý thay đổi text search
   * @param {*} textSearch Từ cần tìm
   */
  const handleChangeTextSearch = (textSearch) => {
    setObjFilter({ ...objFilter, keyword: textSearch });
  };

  /**
   * Thay đổi bộ lọc thì gọi lại danh sách
   */
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }
    fetchList();
  }, [objFilter]);

  const handleSetActionForm = (value) => {
    action.current = value;
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('top')}>
        <NewsListMenuSearch
          setOpenCollectionEditor={setOpenCollectionEditor}
          setActionForm={handleSetActionForm}
          setTextSearch={handleChangeTextSearch}
        />
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <NewsListTableData
          data={newsData}
          onClickShowRowDetail={handleOnClickShowRowDetail}
          setPagination={handleChangePagination}
          onClickEditOneRow={handleOnClickEditOneRow}
          setActionForm={handleSetActionForm}
        />
      </div>
      <CollectionNewsEditor
        action={action.current}
        data={dataDetail.current}
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
