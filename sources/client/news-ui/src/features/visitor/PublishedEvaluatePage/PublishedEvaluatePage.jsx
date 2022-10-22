import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedEvaluatePage.module.scss';
import classNames from 'classnames/bind';
import { Button, Modal, Radio, Row, Space } from 'antd';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import homeApi from 'apis/published/homeApi';

const cx = classNames.bind(styles);

PublishedEvaluatePage.propTypes = {};

PublishedEvaluatePage.defaultProps = {};

const dataFakeChart = [
    {
        name: 'Rất hài lòng',
        value: '53%',
        'Bình chọn': 53,
        fill: 'rgb(169,255,150)',
    },
    {
        name: 'Hài lòng',
        value: '42%',
        'Bình chọn': 42,
        fill: 'rgb(255,188,117)',
    },
    {
        name: 'Chấp nhận được',
        value: '3%',
        'Bình chọn': 3,
        fill: 'rgb(128,133,233)',
    },
    {
        name: 'Không hài lòng',
        value: '0%',
        'Bình chọn': 0,
        fill: 'rgb(241,92,128)',
    },
    {
        name: 'Không thể chấp nhận được',
        value: '0%',
        'Bình chọn': 0,
        fill: 'rgb(253,236,109)',
    },
];

function PublishedEvaluatePage(props) {
    // const [value, setValue] = useState(1);
    // const onChange = (e) => {
    //     console.log('radio checked', e.target.value);
    //     setValue(e.target.value);
    // };
    const [evaluateData, setEvaluateData] = useState();

    const [openModelResult, setOpenModelResult] = useState(false);
    const [dataChartResult, setDataChartResult] = useState([]);

    const listQuestions = [
        {
            Id: 1,
            Title: 'Văn phòng UBND tỉnh Thừa Thiên Huế',
        },
        {
            Id: 1,
            Title: 'Sở Tài nguyên và Môi trường',
        },
        {
            Id: 1,
            Title: 'Sở ngoại vụ',
        },
        {
            Id: 1,
            Title: 'Sở văn hóa và thể thao',
        },
        {
            Id: 1,
            Title: 'Sở xây dựng',
        },
        {
            Id: 1,
            Title: 'Sở công thương',
        },
        {
            Id: 1,
            Title: 'Sở khoa học và công nghệ',
        },
        {
            Id: 1,
            Title: 'Sở Lao động - Thương binh và xã hội',
        },
        {
            Id: 1,
            Title: 'Sở Tư pháp',
        },
        {
            Id: 1,
            Title: 'Sở Du lịch',
        },
    ];

    function handleOnClickResult(id) {
        setDataChartResult(dataFakeChart);
        setOpenModelResult(true);
    }

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = {};
                const response = await homeApi.getEvaluateListData(params);
                setEvaluateData(response?.Data);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchHome();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ScrollToTop />
            <Row className={cx('banner')}>
                <div className={cx('banner-content')}>
                    <h3>Đánh giá sự phục vụ cơ quan nhà nước xã Đông Cuông</h3>
                </div>
            </Row>
            <Row className={cx('tutorial')}>
                <div>
                    Hướng dẫn: Lựa chọn phương án đánh giá và bấm vào nút "Ý kiến" tương ứng để đánh giá chất lượng phục vụ của các cơ quan chuyên môn. Xem tổng hợp kết quả đánh giá: Bấm vào nút "Kết
                    quả".
                </div>
            </Row>
            <Row className={cx('title')}>
                <h3>ĐÁNH GIÁ SỰ PHỤC VỤ CỦA CƠ QUAN HÀNH CHÍNH NHÀ NƯỚC</h3>
            </Row>
            {Array.isArray(evaluateData) &&
                evaluateData.map((item, index) => {
                    const component = (
                        <Row className={cx('question')} key={index}>
                            <div className={cx('tutorial-title')}>
                                {index + 1}. {item.Title}
                            </div>
                            {/* <Radio.Group onChange={onChange} value={value}> */}
                            <Radio.Group size='small'>
                                <Space direction='vertical'>
                                    <Radio value={1}>Rất hài lòng</Radio>
                                    <Radio value={2}>Hài lòng</Radio>
                                    <Radio value={3}>Chấp nhận được</Radio>
                                    <Radio value={4}>Không hài lòng</Radio>
                                    <Radio value={5}>Không thể chấp nhận được</Radio>
                                </Space>
                            </Radio.Group>
                            <div className={cx('btn-group')}>
                                <Button type='primary' size='small'>
                                    Bình chọn
                                </Button>
                                <Button type='primary' size='small' onClick={() => handleOnClickResult(item.Id)}>
                                    Kết quả
                                </Button>
                            </div>
                        </Row>
                    );
                    return component;
                })}

            {/* Model kết quả*/}
            <Modal
                title='Kết quả đánh giá'
                centered
                open={openModelResult}
                onOk={() => setOpenModelResult(false)}
                cancelButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                // onCancel={() => setOpenModelResult(false)}
                width={900}
            >
                <div className={cx('result-container')}>
                    <div className={cx('result-title')}>ĐÁNH GIÁ CHẤT LƯỢNG PHỤC VỤ CỦA TỪNG CƠ QUAN CHUYÊN MÔN</div>
                    <div className={cx('result-description')}>
                        <div>Kết quả bình chọn</div>
                        <div>Thanh tra tỉnh</div>
                    </div>
                    <div className={cx('result-chart')}>
                        <BarChart width={800} height={250} data={dataChartResult} barSize={60}>
                            {/* <CartesianGrid strokeDasharray='3 3' /> */}
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey='Bình chọn' fill='#8884d8'>
                                <LabelList dataKey='value' position='top' fill='#000' />
                            </Bar>
                            {/* <Bar dataKey='uv' fill='#82ca9d' /> */}
                        </BarChart>
                    </div>
                    <div className={cx('result-total')}>Tổng cộng có 241 lượt bình chọn</div>
                </div>
            </Modal>
        </div>
    );
}

export default PublishedEvaluatePage;
