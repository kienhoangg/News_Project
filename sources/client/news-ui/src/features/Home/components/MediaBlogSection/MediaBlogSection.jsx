import classNames from 'classnames/bind';
import routes from 'config/configRoutes';
import Images from '../../../../common/images';
import styles from './MediaBlogSection.module.scss';
import MediaBlogSectionBanner from './MediaBlogSectionBanner/MediaBlogSectionBanner';
import MediaBlogSectionButton from './MediaBlogSectionButton/MediaBlogSectionButton';
import PropTypes from 'prop-types';
import { Skeleton } from 'antd';

const cx = classNames.bind(styles);

MediaBlogSection.propTypes = {
    AlbumImages: PropTypes.array,
    isLoading: PropTypes.bool,
};

MediaBlogSection.defaultProps = {
    isLoading: false,
};

function MediaBlogSection(props) {
    const { isLoading, AlbumImages } = props;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-left')}>
                    <MediaBlogSectionButton href={'/'} size='large' label='MULTIMEDIA' imageName={Images.MULTIMEDIA} />
                </div>
                <div className={cx('navbar-right')}>
                    <MediaBlogSectionButton href={routes.publishedVideos} size='small' label='Video' imageName={Images.VIDEO} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Radio News' imageName={Images.RADIO} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Infographics' imageName={Images.INFOGRAPHICS} />
                    <MediaBlogSectionButton href={routes.publishedPhotos} size='small' label='Photos' imageName={Images.PHOTO} />
                </div>
            </div>
            <div className={cx('carousel')}>
                {isLoading ? (
                    <Skeleton.Image loading={isLoading} style={{ width: '998px', height: 300 }} active></Skeleton.Image>
                ) : (
                    <>
                        <MediaBlogSectionBanner AlbumImages={AlbumImages} />
                    </>
                )}
            </div>
        </div>
    );
}

export default MediaBlogSection;
