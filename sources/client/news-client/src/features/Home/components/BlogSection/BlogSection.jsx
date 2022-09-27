import { Grid } from '@material-ui/core';
import classNames from 'classnames/bind';
import BlogSectionListNews from './BlogSectionListNews/BlogSectionListNews';
import BlogSectionShortList from './BlogSectionShortList/BlogSectionShortList';
import BlogSectionShortNews from './BlogSectionShortNews/BlogSectionShortNews';

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
                <Grid item xs={3} className={cx('blog-right') + ' h-100'}>
                    <div className={cx('container')}>
                        <div className={cx('list-news')}>
                            <BlogSectionListNews />
                        </div>
                        <div className={cx('map')}>
                            <img src='https://yenbai.gov.vn/noidung/lienket/PublishingImages/QuangCaoDoc/bandoyb.gif' alt='' height={'100%'} />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default BlogSection;
