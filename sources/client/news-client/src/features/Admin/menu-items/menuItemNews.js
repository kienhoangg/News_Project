// assets
import DescriptionIcon from '@material-ui/icons/Description';
import routes from 'config/configRoutes';

// constant
const icons = {
    DescriptionIcon: DescriptionIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const menuItemNews = {
    id: 'news',
    title: '',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'news',
            title: 'Tin tức - bài viết',
            type: 'collapse',
            icon: icons.DescriptionIcon,

            children: [
                {
                    id: 'news-list',
                    title: 'Tin tức',
                    type: 'item',
                    url: routes.adminNewsList,
                    target: false
                },
                {
                    id: 'news-hot',
                    title: 'Tin nổi bật',
                    type: 'item',
                    url: routes.adminNewsHot,
                    target: false
                }, {
                    id: 'news-source',
                    title: 'Nguồn tin',
                    type: 'item',
                    url: routes.adminNewsSource,
                    target: false
                },
                {
                    id: 'news-field',
                    title: 'Lĩnh vực',
                    type: 'item',
                    url: routes.adminNewsField,
                    target: false
                },
                {
                    id: 'news-category',
                    title: 'Danh mục tin tức',
                    type: 'item',
                    url: routes.adminNewsCategory,
                    target: false
                },
            ]
        },
    ]
};

export default menuItemNews;
