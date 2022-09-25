import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import About from './features/About/About';
import Home from './features/Home/Home';

// Lazy load - Code splitting
const Blog = React.lazy(() => import('./features/Blog/Blog'));

function App() {
    return (
        <div className="news-app">
            <Suspense fallback={<div>Loading ...</div>}>
                <BrowserRouter>
                    <Switch>
                        <Redirect exact from="/" to="/home" />
                        <Route path="/home" component={Home} />
                        <Route path="/blog" component={Blog} />
                        <Route path="/about" component={About} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}
export default App;
