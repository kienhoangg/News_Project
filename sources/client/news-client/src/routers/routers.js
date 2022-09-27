import NotFound from 'components/NotFound/NotFound';
import config from 'config/config.js';
import SignIn from 'features/Admin/components/SignIn/SignIn';
import AdminLayout from 'features/Admin/layouts/AdminLayout/AdminLayout';
import NewsHotPage from 'features/Admin/pages/NewsHotPage/NewsHotPage';
import NewsListPage from 'features/Admin/pages/NewsListPage/NewsListPage';
import SignInPage from 'features/Admin/pages/SignInPage/SignInPage';
import BlogDetailPage from 'features/Blog/pages/BlogDetailPage/BlogDetailPage';
import BlogMainPage from 'features/Blog/pages/BlogMainPage/BlogMainPage';
import Home from 'features/Home/Home';

// Public routes
const publicRoutes = [
    { path: config.routes.root, component: Home },
    { path: config.routes.blog, component: BlogMainPage },
    { path: config.routes.blogDetail, component: BlogDetailPage },
    { path: config.routes.notfound, component: NotFound, layout: null },

    //Admin
    { path: config.routes.login, component: SignInPage, layout: null },
    { path: config.routes.admin, component: NewsListPage, layout: AdminLayout },
    { path: config.routes.adminNewsList, component: NewsListPage, layout: AdminLayout },
    { path: config.routes.adminNewsHot, component: NewsHotPage, layout: AdminLayout },

    //TEST
    { path: config.routes.test, component: SignIn, layout: null },
];
// { path: config.routes.home, component: Home },

const privateRoutes = [];

export { publicRoutes, privateRoutes };
