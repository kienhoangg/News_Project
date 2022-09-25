import React from 'react';
import styles from './MediaBlogSectionBanner.module.scss';
import classNames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const cx = classNames.bind(styles);

MediaBlogSectionBanner.propTypes = {};

MediaBlogSectionBanner.defaultProps = {};

function MediaBlogSectionBanner(props) {
    return (
        <div className={cx('wrapper')}>
            <Carousel showStatus={false} showThumbs={false} autoPlay={true} interval={2000} infiniteLoop={true}>
                <div>
                    <img src='https://source.unsplash.com/random/1000x350?sig=1' alt='' />
                    {/* <p className='legend'>Legend 1</p> */}
                </div>
                <div>
                    <img src='https://source.unsplash.com/random/1000x350?sig=2' alt='' />
                    {/* <p className='legend'>Legend 2</p> */}
                </div>
                <div>
                    <img src='https://source.unsplash.com/random/1000x350?sig=3' alt='' />
                    {/* <p className='legend'>Legend 3</p> */}
                </div>
                <div>
                    <img src='https://source.unsplash.com/random/1000x350?sig=4' alt='' />
                    {/* <p className='legend'>Legend 3</p> */}
                </div>
                <div>
                    <img src='https://source.unsplash.com/random/1000x350?sig=5' alt='' />
                    {/* <p className='legend'>Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    );
}

export default MediaBlogSectionBanner;
