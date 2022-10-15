import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedDocumentPage.module.scss';
import classNames from 'classnames/bind';
import FormVisitorComment from 'features/visitor/components/FormVisitorComment/FormVisitorComment';
import publishedNewsApi from 'apis/published/publishedNewsApi';
import { Link, useLocation, useParams } from 'react-router-dom';
import datetimeHelper from 'helpers/datetimeHelper';
import commonRender from 'common/commonRender';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import { Breadcrumb, Button, Col, DatePicker, notification, Row } from 'antd';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from 'react-share';
import { MinusOutlined, PlusCircleOutlined, PlusOutlined, PrinterOutlined, SoundOutlined } from '@ant-design/icons';
import moment from 'moment';
import constant from 'common/constant';

const cx = classNames.bind(styles);

PublishedDocumentPage.propTypes = {};

PublishedDocumentPage.defaultProps = {};

function PublishedDocumentPage(props) {
    let { id } = useParams();
    const [data, setData] = useState();
    const [fontSizeContainer, setFontSizeContainer] = useState(13);

    const [dateFilter, setDateFilter] = useState(moment());

    //Lấy dữ liệu chi tiết
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const params = { id };
                const response = await publishedNewsApi.getData(params);
                setData(response);
                setDateFilter(response?.NewsPostDetail.PublishedDate);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchDetail();
    }, []);

    function handleChangeFontSize(value) {
        setFontSizeContainer(fontSizeContainer + value);
    }

    function handleOnChangeDateFilter(date, dateString) {
        setDateFilter(date);
    }

    function onFinishComment(params) {
        console.log('onFinishComment', params);
    }

    return (
        <div className={cx('wrapper')}>
            <ScrollToTop />
            <div className={cx('menu-items')}>
                <Breadcrumb>
                    {data?.CategoryParentNews?.Id && (
                        <Breadcrumb.Item>
                            <Link to={commonRender.renderLinkNewsCategory(data?.CategoryParentNews?.Id)}>{data?.CategoryParentNews?.CategoryNewsName}</Link>
                        </Breadcrumb.Item>
                    )}

                    <Breadcrumb.Item>
                        <Link to={commonRender.renderLinkNewsCategory(data?.NewsPostDetail?.CategoryNews?.Id)}>{data?.NewsPostDetail?.CategoryNews?.CategoryNewsName}</Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className={cx('menu-divider')}></div>
            </div>
            <div className={cx('document-container')}>
                {data && (
                    <>
                        <h3 className={cx('title')}>{data?.NewsPostDetail.Title}</h3>

                        <div className={cx('info-extension')}>
                            <Row gutter={8} justify='space-between'>
                                <Col>
                                    <div className={cx('align-center')}>{datetimeHelper.formatDatetimeToDateVN(data?.NewsPostDetail.PublishedDate)}</div>
                                </Col>
                                <Col flex={1}>
                                    <Row justify='end' align='middle'>
                                        <div className={cx('font-size')}>
                                            <div>Xem cỡ chữ</div>
                                            <Button icon={<MinusOutlined />} size='small' onClick={() => handleChangeFontSize(-1)}></Button>
                                            <Button icon={<PlusOutlined />} size='small' onClick={() => handleChangeFontSize(1)}></Button>
                                        </div>
                                        <div className={cx('print')}>
                                            <Button
                                                size='small'
                                                icon={<PrinterOutlined />}
                                                onClick={() => {
                                                    const url = commonRender.renderLinkNewsDetailPrint(id);
                                                    window.open(url, '_blank');
                                                }}
                                            >
                                                In trang
                                            </Button>
                                            <Button
                                                size='small'
                                                icon={<SoundOutlined />}
                                                onClick={() => {
                                                    commonRender.showNotifiTodo();
                                                }}
                                            >
                                                Đọc bài viết
                                            </Button>
                                        </div>
                                        <div className={cx('share')}>
                                            <FacebookShareButton
                                                url={window.location.href}
                                                // quote={'フェイスブックはタイトルが付けれるようです'}
                                                // hashtag={'#hashtag'}
                                                // description={'aiueo'}
                                                // className='Demo__some-network__share-button'
                                            >
                                                <FacebookIcon size={24} />
                                            </FacebookShareButton>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <h3 style={{ fontSize: fontSizeContainer }} className={cx('description')}>
                            {data?.NewsPostDetail.Description}
                        </h3>
                        <div className={cx('avatar-content')}>
                            <img src={data?.NewsPostDetail.Avatar} alt='' width={'80%'} />
                            <div className={cx('avatar-title')}>{data?.NewsPostDetail.AvatarTitle}</div>
                        </div>

                        <div className={cx('content')}></div>
                        <div style={{ fontSize: fontSizeContainer }} dangerouslySetInnerHTML={{ __html: data?.NewsPostDetail.Content }}></div>

                        {/* TODO: Lượt xem chi tiết bài viết */}
                        {/* <Row className={cx('content-footer')} justify='space-between'>
                            <Col>{605} Lượt xem</Col>
                            <Col>{data?.NewsPostDetail?.SourceName}</Col>
                        </Row> */}
                    </>
                )}
            </div>
            <div className={cx('comment')}>
                <div className={cx('comment-title')}>Ý kiến bạn đọc</div>
                <div className={cx('divider')}></div>
                <FormVisitorComment onFinish={onFinishComment} />
            </div>

            <div className={cx('document-relative')}>
                <div className={cx('document-relative-label')}>Các bài khác</div>
                <div className={cx('document-relative-divider')}></div>

                {data?.NewsRelatives &&
                    data?.NewsRelatives.map((item) => {
                        return (
                            <div key={item.Id} className={cx('document-relative-item')}>
                                <div className={cx('document-relative-icon')}></div>
                                <Link reloadDocument to={commonRender.renderLinkNewsDetail(item.Id)}>
                                    {item.Title}
                                </Link>
                                <span className={cx('document-relative-date')}>{datetimeHelper.formatDateToDateVN(item.PublishedDate)}</span>
                            </div>
                        );
                    })}
            </div>
            <div className={cx('divider')}></div>
            <Row align='end'>
                <Col>
                    <Link to={commonRender.renderLinkNewsCategory(data?.CategoryParentNews?.Id)}>Xem thêm >></Link>
                </Col>
            </Row>
            <Row align='end' style={{ marginTop: 8 }}>
                <Col>
                    <DatePicker defaultValue={dateFilter} format={constant.DATE_FORMAT_VN} onChange={handleOnChangeDateFilter} />
                    <Button style={{ marginLeft: 8 }}>
                        <Link to={commonRender.renderLinkNewsField(data?.CategoryParentNews?.Id, dateFilter)}>Xem</Link>
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default PublishedDocumentPage;
