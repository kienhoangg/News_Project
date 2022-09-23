import { Button } from '@material-ui/core';
import React from 'react';
import './Home.scss';

function Home(props) {
    return (
        <div className='news-home'>
            <Button variant='contained'>Default</Button>
            <Button variant='contained' color='primary'>
                Primary
            </Button>
            <Button variant='contained' color='secondary'>
                Secondary
            </Button>
            <Button variant='contained' color='primary' href='#contained-buttons'>
                Link
            </Button>
        </div>
    );
}

export default Home;
