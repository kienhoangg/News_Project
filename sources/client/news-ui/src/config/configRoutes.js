const routes = {
  root: '/',
  home: '/home',
  blog: '/blog',
  publishedDocument: '/document/:blogId',
  notfound: '/notfound',

  //Admin
  login: '/admin/login',
  admin: '/admin',
  adminNewsList: '/admin/news/list',
  adminNewsHot: '/admin/news/hot',
  adminNewsSource: '/admin/news/source',
  adminNewsField: '/admin/news/field',
  adminNewsCategory: '/admin/news/category',
  adminNewsComment: '/admin/news/comment',
  adminNewsCollaborators: '/admin/news/collaborators',

  adminDocumentList: '/admin/document/list',
  adminDocumentCategory: '/admin/document/category',
  adminDocumentField: '/admin/document/field',
  adminDocumentSinger: '/admin/document/singer',
  adminDocumentSource: '/admin/document/source',

  adminQuestionCategory: '/admin/question/category',
  adminQuestionList: '/admin/question/list',

  adminMediaImageCategory: '/admin/media/image/category',
  adminMediaImageList: '/admin/media/image/list',
  adminMediaVideoList: '/admin/media/video/list',
  adminMediaVideoCategory: '/admin/media/video/category',

  adminAdvertisementCategory: '/admin/advertisement/category',
  adminAdvertisementList: '/admin/advertisement/list',
  adminConnectionCategory: '/admin/connection/category',
  adminConnectionList: '/admin/connection/list',

  adminSetupMenu: '/admin/setup/menu',

  //Test
  test: '/test',
};

export default routes;
