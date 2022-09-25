import { Link } from '@material-ui/core';
import PropTypes from 'prop-types';
import './NavBarButtonItem.scss';

NavBarButtonItem.propTypes = {
    iconName: PropTypes.element,
    label: PropTypes.string,
    href: PropTypes.string,
};

NavBarButtonItem.defaultProps = {
    label: '',
    href: '',
};

function NavBarButtonItem(props) {
    const { iconName, label, href } = props;
    return (
        <Link className='navbar-button-item' href={href} color='inherit' underline='none'>
            {iconName && iconName}
            {label}
        </Link>
    );
}

export default NavBarButtonItem;
