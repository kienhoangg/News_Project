import { LinkOutlined, MinusOutlined, PlusOutlined, PrinterOutlined, SoundOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, Row, Skeleton } from 'antd';
import homeApi from 'apis/published/homeApi';
import classNames from 'classnames/bind';
import commonRender from 'common/commonRender';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import datetimeHelper from 'helpers/datetimeHelper';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import styles from './PublishedStaticPage.module.scss';

const cx = classNames.bind(styles);

PublishedStaticPage.propTypes = {};

PublishedStaticPage.defaultProps = {};

function PublishedStaticPage(props) {
    let { id } = useParams();

    const [dataPage, setDataPage] = useState(null);
    const [loading, setLoading] = useState(true);

    const [fontSizeContainer, setFontSizeContainer] = useState(13);

    useEffect(() => {
        setLoading(true);
        const fetchHome = async () => {
            try {
                const response = await homeApi.getStaticPageData(id);
                setDataPage(response);
                console.log(response);
            } catch (error) {
                setDataPage(null);
                console.log('Failed to fetch list: ', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHome();
    }, [id]);

    function handleChangeFontSize(value) {
        setFontSizeContainer(fontSizeContainer + value);
    }

    return (
        <div className={cx('wrapper')}>
            <ScrollToTop />
            <Skeleton loading={loading} active>
                <div className={cx('menu-items')}>
                    <Breadcrumb>
                        <Breadcrumb.Item>{dataPage?.Title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={cx('menu-divider')}></div>
                </div>
                <div className={cx('document-container')}>
                    {dataPage ? (
                        <>
                            <div className={cx('info-extension')}>
                                <Row gutter={8} justify='space-between'>
                                    <Col>{/* <div className={cx('align-center')}>{datetimeHelper.formatDatetimeToDateVN(data?.NewsPostDetail.PublishedDate)}</div> */}</Col>
                                    <Col flex={1}>
                                        <Row justify='end' align='middle'>
                                            <div className={cx('font-size')}>
                                                <div>Xem cỡ chữ</div>
                                                <Button icon={<MinusOutlined />} size='small' onClick={() => handleChangeFontSize(-1)}></Button>
                                                <Button icon={<PlusOutlined />} size='small' onClick={() => handleChangeFontSize(1)}></Button>
                                            </div>
                                            <div className={cx('print')}>
                                                {/* <Button
                                                    size='small'
                                                    icon={<PrinterOutlined />}
                                                    onClick={() => {
                                                        const url = commonRender.renderLinkNewsDetailPrint(id);
                                                        window.open(url, '_blank');
                                                    }}
                                                >
                                                    In trang
                                                </Button> */}
                                                <Button
                                                    size='small'
                                                    icon={<SoundOutlined />}
                                                    onClick={() => {
                                                        commonRender.showNotifyTodo();
                                                    }}
                                                >
                                                    Đọc bài viết
                                                </Button>
                                            </div>
                                            <div className={cx('share')}>
                                                <FacebookShareButton url={window.location.href}>
                                                    <FacebookIcon size={24} />
                                                </FacebookShareButton>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className={cx('content')}></div>
                            <div style={{ fontSize: fontSizeContainer }} dangerouslySetInnerHTML={{ __html: dataPage.Content }}></div>
                        </>
                    ) : (
                        <h3>Không tìm thấy nội dung</h3>
                    )}
                </div>
            </Skeleton>
        </div>
    );
}

export default PublishedStaticPage;
