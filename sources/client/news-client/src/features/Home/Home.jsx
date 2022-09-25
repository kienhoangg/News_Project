import { Link } from '@material-ui/core';
import React from 'react';
import Images from '../../common/images';
import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar';
import BlogSection from './components/BlogSection/BlogSection';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import MediaBlogSection from './components/MediaBlogSection/MediaBlogSection';

const cx = classNames.bind(styles);

function Home(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Banner />
                <Navbar />
                <div className='news-home-utilities'></div>
                <BlogSection />
                <div className={cx('section-callout-middle')}>
                    <Link href='/' underline='none'>
                        <img src={Images.CONG_DICH_VU} alt='' />
                    </Link>
                    <div className={cx('call-out-middle-hr')}></div>
                    <Link href='/' underline='none' className={cx('btn-call-out')} color=''>
                        <div>CÔNG DÂN DOANH NGHIỆP MỚI</div>
                    </Link>
                </div>
                <MediaBlogSection />
            </div>
        </div>
    );
}

export default Home;
