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
        width: 150,
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
                    Open
                </Button>
            </strong>
        ),
    },
];

const rows = [
    { id: 1, title: 'Snow', field: 'Jon', age: 12, action: <Button>Click</Button> },
    { id: 2, title: 'Lannister', field: 'Cersei', age: 42 },
    { id: 3, title: 'Lannister', field: 'Jaime', age: 45 },
    { id: 4, title: 'Stark', field: 'Arya', age: 16 },
    { id: 5, title: 'Targaryen', field: 'Daenerys', age: null },
    { id: 6, title: 'Melisandre', field: null, age: 150 },
    { id: 7, title: 'Clifford', field: 'Ferrara', age: 44 },
    { id: 8, title: 'Frances', field: 'Rossini', age: 36 },
    { id: 9, title: 'Roxie', field: 'Harvey', age: 65 },
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
