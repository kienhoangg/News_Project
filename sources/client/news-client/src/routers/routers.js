import NotFound from 'components/NotFound/NotFound';
import config from 'config/config.js';
import BlogDetailPage from 'features/Blog/pages/BlogDetailPage/BlogDetailPage';
import BlogMainPage from 'features/Blog/pages/BlogMainPage/BlogMainPage';
import Home from 'features/Home/Home';

// Public routes
const publicRoutes = [
    { path: config.routes.root, component: Home },
    { path: config.routes.blog, component: BlogMainPage },
    { path: config.routes.blogDetail, component: BlogDetailPage },
    { path: config.routes.notfound, component: NotFound, layout: null },
];
// { path: config.routes.home, component: Home },

const privateRoutes = [];

export { publicRoutes, privateRoutes };
