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
                    <MediaBlogSectionButton href={'/'} size='large' label='MULTIMEDIA' imageName={Images.EMBELEM_VIETNAM} />
                </div>
                <div className={cx('navbar-right')}>
                    <MediaBlogSectionButton href={'/'} size='small' label='Video' imageName={Images.EMBELEM_VIETNAM} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Audio' imageName={Images.EMBELEM_VIETNAM} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Graphics' imageName={Images.EMBELEM_VIETNAM} />
                    <MediaBlogSectionButton href={'/'} size='small' label='Photos' imageName={Images.EMBELEM_VIETNAM} />
                </div>
            </div>
            <div className={cx('carousel')}>
                <MediaBlogSectionBanner />
            </div>
        </div>
    );
}

export default MediaBlogSection;
