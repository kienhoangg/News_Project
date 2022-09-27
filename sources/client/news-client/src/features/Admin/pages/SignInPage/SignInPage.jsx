import React from 'react';
import styles from './SignInPage.module.scss';
import classNames from 'classnames/bind';
import SignIn from 'features/Admin/components/SignIn/SignIn';

const cx = classNames.bind(styles);

SignInPage.propTypes = {};

SignInPage.defaultProps = {};

function SignInPage(props) {
    return (
        <div className={cx('wrapper')}>
            <SignIn />
        </div>
    );
}

export default SignInPage;
