import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@material-ui/core';
import './NavBarButtonItem.scss';
import stringHelper from 'helpers/stringHelper';

NavBarButtonItem.propTypes = {
    iconName: PropTypes.element,
    label: PropTypes.string,
    href: PropTypes.string,
};

NavBarButtonItem.defaultProps = {
    iconName: '',
    label: '',
    href: '',
};

function NavBarButtonItem(props) {
    const { iconName, label, href } = props;
    return (
        <Link className='navbar-button-item' href={href} color='#000' underline='none'>
            {stringHelper.isNullOrEmpty(iconName) && iconName}
            {label}
        </Link>
    );
}

export default NavBarButtonItem;
