import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './PublishedIntroducePage.module.scss';
import classNames from 'classnames/bind';
import homeApi from 'apis/published/homeApi';

const cx = classNames.bind(styles);

PublishedIntroducePage.propTypes = {};

PublishedIntroducePage.defaultProps = {};

function PublishedIntroducePage(props) {
    const [dataPage, setDataPage] = useState(null);

    useEffect(() => {
        const fetchHome = async () => {
            try {
                const params = {};
                const response = await homeApi.getIntroduceData(params);
                setDataPage(response);
            } catch (error) {
                console.log('Failed to fetch list: ', error);
            }
        };
        fetchHome();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {dataPage && (
                    <>
                        <div className={cx('title')}>{dataPage?.Title}</div>
                        <div className={cx('content')} dangerouslySetInnerHTML={{ __html: dataPage?.Content }}></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PublishedIntroducePage;
