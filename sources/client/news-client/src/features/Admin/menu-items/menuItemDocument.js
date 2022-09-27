// assets
import DescriptionIcon from '@material-ui/icons/Description';

// constant
const icons = {
    DescriptionIcon: DescriptionIcon
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const menuItemDocument = {
    id: 'document',
    title: '',
    caption: '',
    type: 'group',
    children: [
        {
            id: 'document',
            title: 'Văn bản điều hành',
            type: 'collapse',
            icon: icons.DescriptionIcon,

            children: [
                {
                    id: 'document-list',
                    title: 'Văn bản',
                    type: 'item',
                    url: '/admin/document/list',
                    target: false
                },
                {
                    id: 'document-category',
                    title: 'Loại văn bản',
                    type: 'item',
                    url: '/admin/document/category',
                    target: false
                },
                {
                    id: 'document-field',
                    title: 'Lĩnh vực',
                    type: 'item',
                    url: '/admin/document/field',
                    target: false
                },
                {
                    id: 'document-organization',
                    title: 'Cơ quan ban hành',
                    type: 'item',
                    url: '/admin/document/organization',
                    target: false
                }
            ]
        }
    ]
};

export default menuItemDocument;
