import React from 'react';
import PropTypes from 'prop-types';
import styles from './NewsListPage.module.scss';
import classNames from 'classnames/bind';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';

const cx = classNames.bind(styles);

NewsListPage.propTypes = {};

NewsListPage.defaultProps = {};

const columns = [
    { field: 'title', headerName: 'Tiêu đề', flex: 1, minWidth: 150 },
    {
        field: 'createdDate',
        headerName: 'Ngày tạo',
        type: 'date',
        width: 180,
    },
    {
        field: 'info',
        headerName: 'Thông tin',
        width: 300,
    },
    // {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (params) => `${params.getValue(params.id, 'firstName') || ''} ${params.getValue(params.id, 'lastName') || ''}`,
    // },
    {
        field: 'action',
        headerName: 'Hành động',
        width: 200,
        renderCell: () => (
            <strong>
                <Button variant='contained' color='primary' size='small' style={{ marginLeft: 16 }}>
                    Chỉnh sửa
                </Button>
            </strong>
        ),
    },
];

const rows = [
    { id: 1, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 2, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 3, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 4, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 5, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 6, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 7, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 8, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
    { id: 9, title: 'Văn Yên: Tăng cường ứng dụng công nghệ thông tin, chuyển đổi số trong hoạt động của HĐND', createdDate: '16:18:06 27/09/2022', info: 'Tổng biên tập xuất bản' },
];

function NewsListPage(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('filter')}></div>
            <div className={cx('container')}>
                <DataGrid rows={rows} columns={columns} pageSize={20} disableSelectionOnClick />
            </div>
        </div>
    );
}

export default NewsListPage;
