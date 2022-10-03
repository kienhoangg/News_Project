import classNames from 'classnames/bind';
import Images from '../../../../common/images';
import styles from './MediaBlogSection.module.scss';
import MediaBlogSectionBanner from './MediaBlogSectionBanner/MediaBlogSectionBanner';
import MediaBlogSectionButton from './MediaBlogSectionButton/MediaBlogSectionButton';

const cx = classNames.bind(styles);

MediaBlogSection.propTypes = {};

MediaBlogSection.defaultProps = {};

function MediaBlogSection(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('navbar-left')}>
                    <MediaBlogSectionButton href={'/'} size='large' label='MULTIMEDIA' imageName={Images.MULTIMEDIA} />
                </div>
                <div className={cx('navbar-right')}>
                    <MediaBlogSectionButton href={'/'} size='small' label='Video' imageName={Images.VIDEO} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Radio News' imageName={Images.RADIO} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Infographics' imageName={Images.INFOGRAPHICS} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Photos' imageName={Images.PHOTO} />
                </div>
            </div>
            <div className={cx('carousel')}>
                <MediaBlogSectionBanner />
            </div>
        </div>
    );
}

export default MediaBlogSection;
