import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import BlogSectionShortNews from './BlogSectionShortNews/BlogSectionShortNews';
import BlogSectionShortList from './BlogSectionShortList/BlogSectionShortList';
import BlogSectionListNews from './BlogSectionListNews/BlogSectionListNews';
import classNames from 'classnames/bind';

import styles from './BlogSection.module.scss';
const cx = classNames.bind(styles);

BlogSection.propTypes = {};

function BlogSection(props) {
    return (
        <div className={cx('wrapper')}>
            <Grid container spacing={2} className='h-100'>
                <Grid item xs={9} className='h-100'>
                    <Grid container spacing={2} className='h-100'>
                        <Grid item xs={8} className='h-100'>
                            <BlogSectionShortNews />
                        </Grid>
                        <Grid item xs={4} className='h-100'>
                            <BlogSectionShortList />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} className='h-100'>
                    <div className={cx('list-news')}>
                        <BlogSectionListNews />
                    </div>
                    <div className={cx('map')}>
                        <img src='https://yenbai.gov.vn/noidung/lienket/PublishingImages/QuangCaoDoc/bandoyb.gif' alt='' height={'100%'} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default BlogSection;
