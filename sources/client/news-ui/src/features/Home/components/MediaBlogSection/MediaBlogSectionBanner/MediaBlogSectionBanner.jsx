import React from 'react';
import styles from './MediaBlogSectionBanner.module.scss';
import classNames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Images from 'common/images';

const cx = classNames.bind(styles);

MediaBlogSectionBanner.propTypes = {};

MediaBlogSectionBanner.defaultProps = {};

function MediaBlogSectionBanner(props) {
    return (
        <div className={cx('wrapper')}>
            <Carousel showStatus={false} showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true}>
                <div>
                    <LazyLoadImage effect='blur' src={Images.DEMO_MEDIA_1} alt='' />
                    {/* <p className='legend'>Legend 1</p> */}
                </div>
                <div>
                    <LazyLoadImage effect='blur' src={Images.DEMO_MEDIA_1} alt='' />
                    {/* <p className='legend'>Legend 2</p> */}
                </div>
                <div>
                    <LazyLoadImage effect='blur' src={Images.DEMO_MEDIA_1} alt='' />
                    {/* <p className='legend'>Legend 3</p> */}
                </div>
                <div>
                    <LazyLoadImage effect='blur' src={Images.DEMO_MEDIA_1} alt='' />
                    {/* <p className='legend'>Legend 3</p> */}
                </div>
                <div>
                    <LazyLoadImage effect='blur' src={Images.DEMO_MEDIA_1} alt='' />
                    {/* <p className='legend'>Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    );
}

export default MediaBlogSectionBanner;
