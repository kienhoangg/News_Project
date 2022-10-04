import classNames from 'classnames/bind';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BlogSectionShortNews.module.scss';

const cx = classNames.bind(styles);

BlogSectionShortNews.propTypes = {};

function BlogSectionShortNews(props) {
    const data = {
        link: '/document/123456789',
        title: 'Thông tin chỉ đạo điều hành nổi bật của UBND tỉnh trong tuần (từ 12 - 18/9)',
        image: 'https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Hien-Trang/hoi%20nghi/2309202022_1.jpg',
        content: 'CTTĐT - Sáng 23/9, tại Trụ sở Chính phủ, Thủ tướng Phạm Minh Chính chủ trì Diễn đàn kinh tế hợp tác, hợp tác xã năm 2022 do Bộ Kế hoạch và Đầu tư phối hợp với.....',
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={data.link} underline='none' color='inherit'>
                <h3>{data.title}</h3>
            </Link>
            <img src={data.image} alt='' width={'100%'} />
            <div className={cx('content')}>{data.content}</div>
        </div>
    );
}

export default BlogSectionShortNews;
