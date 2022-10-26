import routes from 'config/configRoutes';

const {
  FileTextFilled,
  ThunderboltFilled,
  CloudFilled,
  FileImageFilled,
  VideoCameraFilled,
  CopyFilled,
  AppstoreFilled,
  BookFilled,
  QuestionCircleFilled,
  PlayCircleFilled,
  CommentOutlined,
  UserOutlined,
  ClusterOutlined,
  SettingOutlined,
  MenuOutlined,
  HighlightOutlined,
  ProfileOutlined,
  AuditOutlined,
  UnorderedListOutlined,
} = require('@ant-design/icons');

const adminMenu = [
  // {
  //     key: 'dashboard',
  //     label: "Tổng quan",
  //     icon: <PieChartOutlined />
  // },
  {
    key: 'news',
    label: 'Tin tức - bài viết',
    icon: <FileTextFilled />,
    children: [
      {
        key: 'news-list',
        label: 'Tin tức',
        icon: <FileTextFilled />,
        to: routes.adminNewsList,
      },
      {
        key: 'news-hot',
        label: 'Tin nổi bật',
        icon: <ThunderboltFilled />,
        to: routes.adminNewsHot,
      },
      {
        key: 'news-comment',
        label: 'Quản trị bình luận',
        icon: <CommentOutlined />,
        to: routes.adminNewsComment,
      },
      {
        key: 'news-source',
        label: 'Nguồn tin',
        icon: <CloudFilled />,
        to: routes.adminNewsSource,
      },
      {
        key: 'news-field',
        label: 'Lĩnh vực',
        icon: <AppstoreFilled />,
        to: routes.adminNewsField,
      },
      {
        key: 'news-category',
        label: 'Danh mục tin tức',
        icon: <ClusterOutlined />,
        to: routes.adminNewsCategory,
      },
      {
        key: 'news-collaborators',
        label: 'Cộng tác viên',
        icon: <UserOutlined />,
        to: routes.adminNewsCollaborators,
      },
    ],
  },
  {
    key: 'document',
    label: 'Văn bản điều hành',
    icon: <BookFilled />,
    children: [
      {
        key: 'document-list',
        label: 'Văn bản',
        icon: <BookFilled />,
        to: routes.adminDocumentList,
      },
      {
        key: 'document-type',
        label: 'Loại văn bản',
        icon: <CopyFilled />,
        to: routes.adminDocumentCategory,
      },
      {
        key: 'document-source',
        label: 'Cơ quan ban hành',
        icon: <CloudFilled />,
        to: routes.adminDocumentSource,
      },
      {
        key: 'document-field',
        label: 'Lĩnh vực',
        icon: <AppstoreFilled />,
        to: routes.adminDocumentField,
      },
      {
        key: 'document-singer',
        label: 'Người ký',
        icon: <AppstoreFilled />,
        to: routes.adminDocumentSinger,
      },
    ],
  },
  {
    key: 'question',
    label: 'Hỏi & đáp',
    icon: <QuestionCircleFilled />,
    children: [
      {
        key: 'question-category',
        label: 'Danh mục chủ đề',
        icon: <QuestionCircleFilled />,
        to: routes.adminQuestionCategory,
      },
      {
        key: 'question-list',
        label: 'Danh sách câu hỏi',
        icon: <QuestionCircleFilled />,
        to: routes.adminQuestionList,
      },
    ],
  },
  {
    key: 'media',
    label: 'Hình ảnh & video',
    icon: <FileImageFilled />,
    children: [
      {
        key: 'media-image',
        label: 'Hình ảnh',
        icon: <FileImageFilled />,
        to: routes.adminMediaImageList,
      },
      {
        key: 'media-image-category',
        label: 'Danh mục hình ảnh',
        icon: <FileImageFilled />,
        to: routes.adminMediaImageCategory,
      },
      {
        key: 'media-video',
        label: 'Video',
        icon: <VideoCameraFilled />,
        to: routes.adminMediaVideoList,
      },
      {
        key: 'media-video-category',
        label: 'Danh mục Video',
        icon: <VideoCameraFilled />,
        to: routes.adminMediaVideoCategory,
      },
    ],
  },
  {
    key: 'advertisement',
    label: 'Liên kết & doanh nghiệp',
    icon: <PlayCircleFilled />,
    children: [
      {
        key: 'advertisement-category',
        label: 'Danh mục doanh nghiệp',
        icon: <PlayCircleFilled />,
        to: routes.adminAdvertisementCategory,
      },
      {
        key: 'advertisement-list',
        label: 'Doanh nghiệp',
        icon: <PlayCircleFilled />,
        to: routes.adminAdvertisementList,
      },
      {
        key: 'connection-category',
        label: 'Danh mục liên kết',
        icon: <ThunderboltFilled />,
        to: routes.adminConnectionCategory,
      },
      {
        key: 'connection-list',
        label: 'Liên kết',
        icon: <ThunderboltFilled />,
        to: routes.adminConnectionList,
      },
    ],
  },
  {
    key: 'setup',
    label: 'Thiết lập cổng',
    icon: <SettingOutlined />,
    children: [
      {
        key: 'setup-menu',
        label: 'Menu hệ thống',
        icon: <MenuOutlined />,
        to: routes.adminSetupMenu,
      },
    ],
  },
  {
    key: 'static',
    label: 'Thông tin tĩnh',
    icon: <HighlightOutlined />,
    children: [
      {
        key: 'static-category',
        label: 'Danh mục tĩnh',
        icon: <UnorderedListOutlined />,
        to: routes.staticCategory,
      },
      {
        key: 'static-content',
        label: 'Nội dung tĩnh',
        icon: <AuditOutlined />,
        to: routes.staticContent,
      },
    ],
  },
];

const adminConst = { adminMenu };

export default adminConst;
