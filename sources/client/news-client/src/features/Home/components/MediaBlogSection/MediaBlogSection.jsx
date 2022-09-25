import React from 'react';
import PropTypes from 'prop-types';
import styles from './MediaBlogSection.module.scss';
import classNames from 'classnames/bind';
import { Link } from '@material-ui/core';
import Images from '../../../../common/images';
import MediaBlogSectionButton from './MediaBlogSectionButton/MediaBlogSectionButton';

const cx = classNames.bind(styles);

MediaBlogSection.propTypes = {};

MediaBlogSection.defaultProps = {};

function MediaBlogSection(props) {
    return (
        <div className={cx('wrapper')}>
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
    );
}

export default MediaBlogSection;
