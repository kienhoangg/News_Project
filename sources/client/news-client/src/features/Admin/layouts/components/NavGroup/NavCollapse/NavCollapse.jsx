import { Collapse, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import NavItem from '../NavItem/NavItem';
import styles from './NavCollapse.module.scss';

const cx = classNames.bind(styles);

const NavCollapse = ({ menu, level }) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    // menu collapse & item
    const menus = menu.children?.map((item) => {
        switch (item.type) {
            case 'collapse':
                return <NavCollapse key={item.id} menu={item} level={level + 1} />;
            case 'item':
                return <NavItem key={item.id} item={item} level={level + 1} />;
            default:
                return (
                    <Typography key={item.id} variant='h6' color='error' align='center'>
                        Menu Items Error
                    </Typography>
                );
        }
    });

    const Icon = menu.icon;
    const menuIcon = menu.icon ? (
        <Icon strokeWidth={1.5} size='1.3rem' style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    ) : (
        <FiberManualRecordIcon
            style={{
                width: selected === menu.id ? 8 : 6,
                height: selected === menu.id ? 8 : 6,
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    return (
        <div className={cx('wrapper')}>
            <ListItem
                style={{
                    borderRadius: `4px`,
                    mb: 0.5,
                    // alignItems: 'center',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`,
                }}
                selected={selected === menu.id}
                onClick={handleClick}
            >
                <ListItemIcon style={{ my: 'auto', minWidth: !menu.icon ? 18 : 36 }}>{menuIcon}</ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={selected === menu.id ? 'h5' : 'body1'} color='inherit' style={{ my: 'auto' }}>
                            {menu.title}
                        </Typography>
                    }
                    secondary={
                        menu.caption && (
                            <Typography variant='caption' style={{ ...theme.typography.subMenuCaption }} display='block' gutterBottom>
                                {menu.caption}
                            </Typography>
                        )
                    }
                />
                {open ? (
                    <KeyboardArrowUpIcon stroke={1.5} fontSize='small' style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                ) : (
                    <KeyboardArrowDownIcon stroke={1.5} fontSize='small' style={{ marginTop: 'auto', marginBottom: 'auto' }} />
                )}
            </ListItem>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List
                    component='div'
                    disablePadding
                    style={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                        },
                    }}
                >
                    {menus}
                </List>
            </Collapse>
        </div>
    );
};

NavCollapse.propTypes = {
    menu: PropTypes.object,
    level: PropTypes.number,
};

export default NavCollapse;
