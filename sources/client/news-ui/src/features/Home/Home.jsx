import BlogSection from './components/BlogSection/BlogSection';
import MediaBlogSection from './components/MediaBlogSection/MediaBlogSection';
import { Col, Divider, Row } from 'antd';
import homeApi from 'apis/published/homeApi';
import classNames from 'classnames/bind';
import Images from 'common/images';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ConnectionSection from './components/ConnectionSection/ConnectionSection';
import ListSection from './components/ListSection/ListSection';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './Home.module.scss';
import { updateLoading, updateRunPosts, updateView } from './homeSlice';

const cx = classNames.bind(styles);

function Home(props) {
    const [homeData, setHomeData] = useState();
    const [newsPreview, setNewsPreview] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = {};
                const response = await homeApi.getData(params);
                setHomeData(response);
                setNewsPreview(response?.Data?.NewsHots[0]);

                const actionUpdateView = updateView(response?.Data?.VisitorTracking);
                dispatch(actionUpdateView);

                if (Array.isArray(response?.Data?.NewsDocuments)) {
                    const actionUpdateRunPosts = updateRunPosts(response?.Data?.NewsDocuments);
                    dispatch(actionUpdateRunPosts);
                }

                const actionLoading = updateLoading(false);
                dispatch(actionLoading);

                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchHome();
    }, []);

    function handleOnHoverNewPreview(values) {
        if (values?.isEnter) {
            setNewsPreview(values);
        } else {
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <SearchBar />
                <BlogSection isLoading={loading} documentHots={homeData?.Data?.DocumentHots} newsHots={homeData?.Data?.NewsHots} dataPreview={newsPreview} onHover={handleOnHoverNewPreview} />

                <Divider style={{ margin: '16px 0', borderTopWidth: 2 }}></Divider>
                <Row gutter={16} className={cx('section-callout-middle')}>
                    <Col span={12}>
                        <Link to='/' underline='none'>
                            <img src={Images.CONG_DICH_VU} alt='' />
                        </Link>
                    </Col>
                    <Col span={12}>
                        <div className={cx('btn-call-out')}>
                            <Link to='/' underline='none' color='inherit'>
                                <div>CÔNG DÂN DOANH NGHIỆP MỚI</div>
                            </Link>
                        </div>
                    </Col>
                </Row>
                <MediaBlogSection isLoading={loading} AlbumImages={homeData?.Data?.Images} />
                <ListSection isLoading={loading} dataNews={homeData?.Data?.NewsSectionDto} dataDocuments={homeData?.Data?.DocumentSectionDto} />
                <ConnectionSection isLoading={loading} connectionSites={homeData?.Data?.LinkInfos} connectionConcern={homeData?.Data?.CompanyInfos} />
            </div>
        </div>
    );
}

export default Home;
