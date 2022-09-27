import { Avatar, Box, Button, TextField, Typography } from '@material-ui/core';
import { Lock } from '@material-ui/icons';
import classNames from 'classnames/bind';
import routes from 'config/configRoutes';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

SignIn.propTypes = {};

SignIn.defaultProps = {};

function SignIn(props) {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('user'),
            password: data.get('password'),
        });

        navigate(routes.admin);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-container')}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <Lock color='primary' />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Đăng nhập
                </Typography>
                <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin='normal' variant='outlined' required fullWidth id='user' label='Tài khoản' name='user' autoFocus />
                    <TextField margin='normal' variant='outlined' required fullWidth name='password' label='Mật khẩu' type='password' id='password' autoComplete='current-password' />
                    {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
                    <Button style={{ marginTop: 16 }} type='submit' fullWidth variant='contained'>
                        Đăng nhập
                    </Button>
                </Box>
            </div>
        </div>
    );
}

export default SignIn;
