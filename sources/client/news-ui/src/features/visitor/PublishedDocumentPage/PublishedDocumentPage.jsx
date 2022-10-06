import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedDocumentPage.module.scss';
import classNames from 'classnames/bind';
import FormVisitorComment from 'features/visitor/components/FormVisitorComment/FormVisitorComment';
import publishedNewsApi from 'apis/published/publishedNewsApi';
import { Link, useParams } from 'react-router-dom';
import datetimeHelper from 'helpers/datetimeHelper';
import commonRender from 'common/commonRender';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

const cx = classNames.bind(styles);

PublishedDocumentPage.propTypes = {};

PublishedDocumentPage.defaultProps = {};

function PublishedDocumentPage(props) {
    let { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const params = { id };

                const response = await publishedNewsApi.getData(params);
                console.log(response);

                setData(response);
                console.log('PublishedDocumentPage', id, response);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };

        /**
         * Convert dữ liệu lấy từ API sang dữ liệu UI
         * @param {object} dataApi Dữ liệu lấy từ API
         */
        const convertDataApiToDataUI = (dataApi) => {};

        fetchDetail();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <ScrollToTop />
            <div className={cx('document-container')}>
                {data && (
                    <>
                        <h3 className={cx('title')}>{data?.newsPostDetail.title}</h3>
                        <h3 className={cx('description')}>{data?.newsPostDetail.description}</h3>
                        <div className={cx('avatar-content')}>
                            <img src={data?.newsPostDetail.avatar} alt='' width={'80%'} />
                            <div className={cx('avatar-title')}>{data?.newsPostDetail.avatarTitle}</div>
                        </div>

                        <div className={cx('content')}></div>
                        <div dangerouslySetInnerHTML={{ __html: data?.newsPostDetail.content }}></div>
                    </>
                )}
            </div>
            <FormVisitorComment />

            <div className={cx('document-relative')}>
                <div className={cx('document-relative-label')}>Các bài khác</div>
                <div className={cx('document-relative-divider')}></div>

                {data?.newsRelatives &&
                    data?.newsRelatives.map((item) => {
                        return (
                            <div key={item.id} className={cx('document-relative-item')}>
                                <div className={cx('document-relative-icon')}></div>
                                <Link to={commonRender.renderLinkNewsDetail(item.id)}>{item.title}</Link>
                                <span className={cx('document-relative-date')}>{datetimeHelper.formatDateToDateVN(item.publishedDate)}</span>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default PublishedDocumentPage;
