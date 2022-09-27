import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './NavItem.module.scss';
import classNames from 'classnames/bind';
import { Avatar, Chip, ListItem, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { menuOpen, setMenu } from 'features/Admin/adminMenuSlice';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const NavItem = ({ item, level }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const adminMenu = useSelector((state) => state.adminMenu);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size='16px' />
    ) : (
        <FiberManualRecordIcon
            style={{
                width: 8,
                height: 8,
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} underline='none' />),
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const itemHandler = (id) => {
        const actionMenuOpen = menuOpen({ id });
        dispatch(actionMenuOpen);
        if (matchesSM) {
            const actionSetMenu = setMenu({ opened: false });
            dispatch(actionSetMenu);
        }
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            const actionMenuOpen = menuOpen({ id: item.id });
            dispatch(actionMenuOpen);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItem
            className={cx('wrapper')}
            {...listItemProps}
            disabled={item.disabled}
            style={{
                borderRadius: `${adminMenu.borderRadius}px`,
                mb: 0.5,
                // alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`,
            }}
            selected={adminMenu.isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon style={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={adminMenu.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} color='inherit'>
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography variant='caption' display='block' gutterBottom>
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && <Chip color={item.chip.color} variant={item.chip.variant} size={item.chip.size} label={item.chip.label} avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>} />}
        </ListItem>
    );
};

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number,
};

export default NavItem;
