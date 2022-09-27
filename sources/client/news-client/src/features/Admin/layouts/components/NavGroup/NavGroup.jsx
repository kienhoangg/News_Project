import { Divider, List, Typography } from '@material-ui/core';
import classNames from 'classnames/bind';
import NavCollapse from './NavCollapse/NavCollapse';
import styles from './NavGroup.module.scss';
import NavItem from './NavItem/NavItem';

const cx = classNames.bind(styles);

NavGroup.propTypes = {};

NavGroup.defaultProps = {};

function NavGroup({ item }) {
    const items = item.children?.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                return <NavCollapse key={menu.id} menu={menu} level={1} />;
            case 'item':
                return <NavItem key={menu.id} item={menu} level={1} />;
            default:
                return (
                    <Typography key={menu.id} variant='h6' color='error' align='center'>
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return (
        <div className={cx('wrapper')}>
            <List
                subheader={
                    item.title && (
                        <Typography
                            variant='caption'
                            style={{
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                padding: '6px',
                                textTransform: 'capitalize',
                                marginTop: '10px',
                            }}
                            display='block'
                            gutterBottom
                        >
                            {item.title}
                            {item.caption && (
                                <Typography variant='caption' style={{ fontSize: '0.6875rem', fontWeight: 500, textTransform: 'capitalize' }} display='block' gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>
            {/* group divider */}
            <Divider sx={{ mt: 0.25, mb: 1.25 }} />
        </div>
    );
}

export default NavGroup;
