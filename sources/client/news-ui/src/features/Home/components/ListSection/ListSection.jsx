import React from 'react';
import PropTypes from 'prop-types';
import styles from './ListSection.module.scss';
import classNames from 'classnames/bind';
import { Col, Divider, Row } from 'antd';
import ListSectionButton from './ListSectionButton/ListSectionButton';
import Images from 'common/images';
import { SearchOutlined } from '@ant-design/icons';
import ListSectionDocument from './ListSectionDocument/ListSectionDocument';
import { Link } from 'react-router-dom';
import ListSectionNews from './ListSectionNews/ListSectionNews';
import commonRender from 'common/commonRender';

const cx = classNames.bind(styles);

ListSection.propTypes = {
    data: PropTypes.object,
};

ListSection.defaultProps = {
    data: {},
};

const LIST_BUTON = [
    {
        Href: '/',
        Label: 'ĐIỀU ƯỚC QUỐC TẾ',
        Image: Images.LIST_BUTTON_ITEM,
    },
    {
        Href: '/',
        Label: 'PHỔ BIẾN PHÁP LUẬT',
        Image: Images.LIST_BUTTON_ITEM,
    },
    {
        Href: '/',
        Label: 'HÒM THƯ GÓP Ý',
        Image: Images.LIST_BUTTON_ITEM,
    },
    {
        Href: '/',
        Label: 'ĐÁNH GIÁ SỰ PHỤC VỤ CỦA CƠ QUAN HÀNH CHÍNH NHÀ NƯỚC',
        Image: Images.LIST_BUTTON_ITEM,
    },
    {
        Href: '/',
        Label: 'THÔNG TIN CÔNG KHAI',
        Image: Images.LIST_BUTTON_ITEM,
    },
    {
        Href: '/',
        Label: 'THÔNG TIN CẦN BIẾT',
        Image: Images.LIST_BUTTON_ITEM,
    },
];

const LIST_DOCUMENT = [
    { Href: '/', Title: '1758/QĐ-BTTTT', Date: '2022-09-30T13:54:50.005Z', Description: 'Quy định chức năng, nhiêm vụ, quyền hạn và cơ cấu tổ chức của vụ tổ chức cán bộ 3' },
    { Href: '/', Title: '1752/QĐ-BTTTT', Date: '2022-09-29T13:54:50.005Z', Description: 'Quy định chức năng, nhiêm vụ, quyền hạn và cơ cấu tổ chức của vụ tổ chức cán bộ 2' },
    { Href: '/', Title: '1751/QĐ-BTTTT', Date: '2022-09-28T13:54:50.005Z', Description: 'Quy định chức năng, nhiêm vụ, quyền hạn và cơ cấu tổ chức của vụ tổ chức cán bộ 1' },
    { Href: '/', Title: '1753/QĐ-BTTTT', Date: '2022-09-28T13:54:50.005Z', Description: 'Quy định chức năng, nhiêm vụ, quyền hạn và cơ cấu tổ chức của vụ tổ chức cán bộ 1' },
];

const LIST_NEWS = [
    { href: '/', title: 'Tỉnh Hậu Giang tổ chức hội thi tuyên truyền lưu động về an toàn giao thông', avatar: Images.DEMO_AVATAR_1 },
    { href: '/', title: 'Thái Nguyên: Thúc đẩy chuyển đổi số trong ngành kiếm sát', avatar: '' },
    { href: '/', title: 'Đà Năng chính thức ra mắt ứng dụng quản lý, giám stas hành trình xe cứu thương', avatar: '' },
    { href: '/', title: 'Bắc Nình tập huấn kỹ năng số cho Tổ công nghệ số cộng đồng', avatar: '' },
];

// href: PropTypes.string,
// label: PropTypes.string,
// imageName: PropTypes.any,

function ListSection(props) {
    const { data } = props;
    const { CategoryNews, Data: items } = data;
    if (Array.isArray(items) && items.length > 1) {
        for (let i = 1; i < items.length; i++) {
            items[i].Avatar = '';
        }
    }
    return (
        <Row gutter={16} className={cx('wrapper')}>
            <Col span={8}>
                {LIST_BUTON.map((item) => {
                    return <ListSectionButton href={item.Href} imageName={item.Image} key={item.Label} label={item.Label} />;
                })}
            </Col>
            <Col span={8}>
                <div className={cx('list-document')}>
                    <Row gutter={0} className={cx('list-card')}>
                        <Col span={12}>Dạng văn bản</Col>
                        <Col span={12}>
                            <Link className={cx('search-right')} to='/'>
                                <span style={{ fontSize: 13, marginRight: 4 }}>Tìm kiếm văn bản</span>
                                <SearchOutlined color='#fff' />
                            </Link>
                        </Col>
                    </Row>
                    <div className={cx('list-document-content')}>
                        {LIST_DOCUMENT.map((item) => {
                            return <ListSectionDocument title={item.Title} date={item.Date} key={item.Title} description={item.Description} href={item.Href} />;
                        })}
                    </div>
                </div>
            </Col>
            <Col span={8}>
                <div className={cx('list-news')}>
                    <Row gutter={0} className={cx('list-card')} justify='space-between'>
                        <Col span={12}>Dạng tin tức</Col>
                    </Row>
                    <div className={cx('list-document-content')}>
                        <div className={cx('title-news')}>
                            <div className={cx('divider')}></div>
                            <Link to={commonRender.renderLinkNewsCategory(CategoryNews?.Id)}>{CategoryNews?.CategoryNewsName}</Link>
                        </div>
                        {Array.isArray(items) &&
                            items.map((item) => {
                                return <ListSectionNews title={item.Title} key={item.Id} avatar={item.Avatar} href={commonRender.renderLinkNewsDetail(item.Id)} />;
                            })}
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default ListSection;
