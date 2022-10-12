import config from "config/config.js";
import AdminLayout from "features/admin/layouts/AdminLayout/AdminLayout";
import DocumentCategoryPage from "features/admin/pages/documents/DocumentCategoryPage/DocumentCategoryPage";
import DocumentFieldPage from "features/admin/pages/documents/DocumentFieldPage/DocumentFieldPage";
import DocumentListPage from "features/admin/pages/documents/DocumentListPage/DocumentListPage.";
import DocumentSignerPage from "features/admin/pages/documents/DocumentSignerPage/DocumentSignerPage";
import DocumentSourcePage from "features/admin/pages/documents/DocumentSourcePage/DocumentSourcePage";
import LoginPage from "features/admin/pages/LoginPage/LoginPage";
import ImageCategoryPage from "features/admin/pages/media/ImageCategoryPage/ImageCategoryPage";
import ImageListPage from "features/admin/pages/media/ImageListPage/ImageListPage";
import VideoCategoryPage from "features/admin/pages/media/VideoCategoryPage/VideoCategoryPage";
import VideoListPage from "features/admin/pages/media/VideoListPage/VideoListPage";
import NewsCategoryPage from "features/admin/pages/news/NewsCategoryPage/NewsCategoryPage";
import NewsCollaboratorsPage from "features/admin/pages/news/NewsCollaboratorsPage/NewsCollaboratorsPage";
import NewsCommentPage from "features/admin/pages/news/NewsCommentPage/NewsCommentPage";
import NewsFieldPage from "features/admin/pages/news/NewsFieldPage/NewsFieldPage";
import NewsHotPage from "features/admin/pages/news/NewsHotPage/NewsHotPage";
import NewsListPage from "features/admin/pages/news/NewsListPage/NewsListPage";
import NewsSourcePage from "features/admin/pages/news/NewsSourcePage/NewsSourcePage";
import QuestionCategoryPage from "features/admin/pages/questions/QuestionCategoryPage/QuestionCategoryPage";
import QuestionListPage from "features/admin/pages/questions/QuestionListPage/QuestionListPage";
import MenuPage from "features/admin/pages/setup/MenuPage/MenuPage";
import Home from "features/Home/Home";
import PublishedDocumentPage from "features/visitor/PublishedDocumentPage/PublishedDocumentPage";
import PublishedDocumentPrintPage from "features/visitor/PublishedDocumentPrintPage/PublishedDocumentPrintPage";
import PublishedIntroducePage from "features/visitor/PublishedIntroducePage/PublishedIntroducePage";
import PublishedMenuPage from "features/visitor/PublishedMenuPage/PublishedMenuPage";
import PublishedNewsFieldPage from "features/visitor/PublishedNewsFieldPage/PublishedNewsFieldPage";
import PublishedNewsListCategoryPage from "features/visitor/PublishedNewsListCategoryPage/PublishedNewsListCategoryPage";
import PublishedNewsListDocumentPage from "features/visitor/PublishedNewsListDocumentPage/PublishedNewsListDocumentPage";
import SearchPage from "features/visitor/SearchPage/SearchPage";

// Public routes
const publicRoutes = [
  { path: config.routes.root, component: Home },
  // { path: config.routes.blog, component: BlogMainPage },
  { path: config.routes.publishedDocument, component: PublishedDocumentPage },
  { path: config.routes.publishedNewsPost, component: PublishedDocumentPage },
  {
    path: config.routes.publishedNewsPostPrint,
    component: PublishedDocumentPrintPage,
    layout: null,
  },
  {
    path: config.routes.publishedNewsPostListCategory,
    component: PublishedNewsListCategoryPage,
  },
  {
    path: config.routes.publishedNewsPostCategory,
    component: PublishedNewsFieldPage,
  },

  {
    path: config.routes.publishedDocumentList,
    component: PublishedNewsListDocumentPage,
  },

  { path: config.routes.publishedIntroduce, component: PublishedIntroducePage },

  { path: config.routes.publishedMenu, component: PublishedMenuPage },
  { path: config.routes.search, component: SearchPage },
  // { path: config.routes.notfound, component: NotFound, layout: null },

  // //Admin
  { path: config.routes.login, component: LoginPage, layout: null },
  { path: config.routes.admin, component: NewsListPage, layout: AdminLayout },
  {
    path: config.routes.adminNewsList,
    component: NewsListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminNewsHot,
    component: NewsHotPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminNewsComment,
    component: NewsCommentPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminNewsSource,
    component: NewsSourcePage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminNewsField,
    component: NewsFieldPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminNewsCategory,
    component: NewsCategoryPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminNewsCollaborators,
    component: NewsCollaboratorsPage,
    layout: AdminLayout,
  },

  {
    path: config.routes.adminDocumentList,
    component: DocumentListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminDocumentCategory,
    component: DocumentCategoryPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminDocumentField,
    component: DocumentFieldPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminDocumentSinger,
    component: DocumentSignerPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminDocumentSource,
    component: DocumentSourcePage,
    layout: AdminLayout,
  },

  {
    path: config.routes.adminQuestionList,
    component: QuestionListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminQuestionCategory,
    component: QuestionCategoryPage,
    layout: AdminLayout,
  },

  {
    path: config.routes.adminMediaImageList,
    component: ImageListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminMediaImageCategory,
    component: ImageCategoryPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminMediaVideoList,
    component: VideoListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminMediaVideoCategory,
    component: VideoCategoryPage,
    layout: AdminLayout,
  },

  {
    path: config.routes.adminAdvertisementCategory,
    component: ImageListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminAdvertisementList,
    component: ImageCategoryPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminConnectionCategory,
    component: VideoListPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminConnectionList,
    component: VideoCategoryPage,
    layout: AdminLayout,
  },
  {
    path: config.routes.adminSetupMenu,
    component: MenuPage,
    layout: AdminLayout,
  },
  {
    path: "tdba",
    component: QuestionAndAnswerPage,
  },

  // { path: config.routes.admin, component: NewsListPage, layout: AdminLayout },
  // { path: config.routes.adminNewsList, component: NewsListPage, layout: AdminLayout },
  // { path: config.routes.adminNewsHot, component: NewsHotPage, layout: AdminLayout },

  // //TEST
  // { path: config.routes.test, component: PostEditor, layout: null },
];
// { path: config.routes.home, component: Home },

const privateRoutes = [];

export { publicRoutes, privateRoutes };
