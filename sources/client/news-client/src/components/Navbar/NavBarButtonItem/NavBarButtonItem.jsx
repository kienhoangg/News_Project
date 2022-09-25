import React from 'react';
import PropTypes from 'prop-types';
import stringHelper from '../../../helper/stringHelper';
import { Link } from '@material-ui/core';
import './NavBarButtonItem.scss';

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
    const { iconName, label } = props;
    return (
        <Link className='navbar-button-item' href='' color='#000' underline='none'>
            {stringHelper.isNullOrEmpty(iconName) && iconName}
            {label}
        </Link>
    );
}

export default NavBarButtonItem;
