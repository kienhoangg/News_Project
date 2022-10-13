import BlogSection from './components/BlogSection/BlogSection';
import MediaBlogSection from './components/MediaBlogSection/MediaBlogSection';

import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import { Col, Divider, Row } from 'antd';
import ListSection from './components/ListSection/ListSection';
import ConnectionSection from './components/ConnectionSection/ConnectionSection';
import FooterSection from './components/FooterSection/FooterSection';
import Images from 'common/images';
import { useEffect, useRef, useState } from 'react';
import homeApi from 'apis/published/homeApi';

const cx = classNames.bind(styles);

function Home(props) {
    const [homeData, setHomeData] = useState();
    const [newsPreview, setNewsPreview] = useState(null);

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = {};
                const response = await homeApi.getData(params);
                setHomeData(response);
                setNewsPreview(response?.Data?.NewsHots[0]);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchHome();
    }, []);

    function handleOnHoverNewPreview(values) {
        console.log('values', values);
        if (values?.isEnter) {
            setNewsPreview(values);
        } else {
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <SearchBar />
                <BlogSection newsHots={homeData?.Data?.NewsHots} dataPreview={newsPreview} onHover={handleOnHoverNewPreview} />

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
                <MediaBlogSection />
                <ListSection data={homeData?.Data?.NewsSectionDto} />
                <ConnectionSection />
            </div>
        </div>
    );
}

export default Home;
