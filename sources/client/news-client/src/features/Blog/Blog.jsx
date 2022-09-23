import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import BlogDetailPage from './pages/BlogDetailPage/BlogDetailPage';
import BlogMainPage from './pages/BlogMainPage/BlogMainPage';

function Blog(props) {
    const match = useRouteMatch();
    console.log({ match });

    return (
        <Switch>
            <Route exact path={match.url} component={BlogMainPage} />
            <Route path={`${match.url}/:blogId`} component={BlogDetailPage} />
        </Switch>
    );
}

export default Blog;
