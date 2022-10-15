import { Divider, Button, Modal } from 'antd';
import newsApi from 'apis/newsApi';
import { useEffect, useState, useRef } from 'react';
import NewsHotPageSearch from './NewsHotPageSearch/NewsHotPageSearch';
import NewsHotTableData from './NewsHotTableData/NewsHotTableData';

import classNames from 'classnames/bind';
import styles from './NewsHotPage.module.scss';
import { FileAddFilled } from '@ant-design/icons';
import { Direction, NotificationType } from 'common/enum';
import { openNotification } from 'helpers/notification';
import NewsHotTableDataPopUp from './NewsHotTableDataPopUp/NewsHotTableDataPopUp';

const cx = classNames.bind(styles);

NewsHotPage.propTypes = {};

NewsHotPage.defaultProps = {};

function NewsHotPage(props) {
  const [newsData, setNewsData] = useState({});
  const [newsDataPopUp, setNewsDataPopUp] = useState({});
  const isFirstCall = useRef(true);
  const [objFilter, setObjFilter] = useState({
    currentPage: 1,
    pageSize: 10,
    direction: Direction.DESC,
    orderBy: 'CreatedDate',
    keyword: '',
    IsHotNews: true,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changeRowKey, setChangeRowKey] = useState();
  useEffect(() => {
    if (isFirstCall.current) {
      isFirstCall.current = false;
      return;
    }
    fetchProductList();
  }, [objFilter]);

  const fetchProductList = async () => {
    try {
      const response = await newsApi.getNewsAll(objFilter);
      setNewsData({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
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

  const handleDeleteSourceNew = async (id) => {
    try {
      await newsApi.deleteSourceNew(id);
      openNotification('Xóa nguồn tin thành công');
      fetchProductList();
    } catch (error) {
      openNotification('Xóa nguồn tin thất bại', '', NotificationType.ERROR);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
    fetchProductListPopUp();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchProductListPopUp = async () => {
    try {
      const response = await newsApi.getNewsAll({
        ...objFilter,
        IsHotNews: false,
      });
      setNewsDataPopUp({
        data: response?.PagedData?.Results ?? [],
        total: response?.PagedData?.RowCount ?? 0,
      });
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  const handleOK = () => {
    updateHotNews();
  };

  const updateHotNews = async () => {
    try {
      await newsApi.updateHotNews({
        lstNewsPostId: changeRowKey,
      });
      fetchProductListPopUp();
    } catch (error) {
      console.log('Failed to fetch list: ', error);
    }
  };

  const handleChangeRowKey = (value) => {
    setChangeRowKey(value);
  };
  return (
    <div className={cx('wrapper')}>
      <Modal
        className={cx('modal-insert-source-news')}
        title='Thêm mới nguồn tin tức'
        open={isModalOpen}
        onOk={handleOK}
        onCancel={handleCancel}
        width={'70vw'}
      >
        <div className={cx('top')}>
          <NewsHotPageSearch />
        </div>
        <Divider style={{ marginBottom: '12px' }} />
        <div className={cx('table-data')}>
          <NewsHotTableDataPopUp
            data={newsDataPopUp}
            setPagination={handleChangePagination}
            deleteSourceNew={handleDeleteSourceNew}
            changeRowKey={handleChangeRowKey}
          />
        </div>
      </Modal>

      <div className={cx('top')}>
        <NewsHotPageSearch />
        <div className={cx('btn-add-source-news')}>
          <Button type='primary' icon={<FileAddFilled />} onClick={showModal}>
            Thêm mới
          </Button>
        </div>
      </div>
      <Divider style={{ margin: '0' }} />
      <div className={cx('table-data')}>
        <NewsHotTableData
          data={newsData}
          setPagination={handleChangePagination}
          deleteSourceNew={handleDeleteSourceNew}
        />
      </div>
    </div>
  );
}

export default NewsHotPage;
