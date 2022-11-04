const routes = {
  root: '/',

  // publishedDocument: '/document/:blogId',
  // publishedDocumentList: '/documents',

  publishedNewsPost: '/news-posts/detail/:id',
  publishedNewsPostPrint: '/news-posts/detail/print/:id',

  publishedNewsPostListCategory: '/news-posts/fields',
  publishedNewsPostCategory: '/news-posts/fields/:id',
  publishedInternationalTreaties: '/news-posts/international-treaties',
  publishedLawDissemination: '/news-posts/law-dissemination',
  publishedSuggestionBox: '/news-posts/suggestion-box',

  publishedDocumentDetail: '/documents/:id',
  publishedDocumentList: '/documents',

  publishedIntroduce: '/introduce',
  publishedStaticPage: '/page/:id', //Giành cho menu

  publishedEvaluatePage: '/evaluate', //Giành cho menu

  publishedQuestions: '/questions',
  publishedPhotos: '/media/photos', //QueryPrams: ?albumid=1
  publishedVideos: '/media/videos', //QueryPrams: ?videoid=1
  publishedQuestionsDetail: '/questions/:id',

  search: '/search',
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

  adminConnectionCategory: '/admin/connection/category',
  adminConnectionList: '/admin/connection/list',
  adminCompanyCategory: '/admin/company/category',
  adminCompanyList: '/admin/company/list',
  adminAdvertisementCategory: '/admin/advertisement/category',
  adminAdvertisementList: '/admin/advertisement/list',

  adminSetupMenu: '/admin/setup/menu',

  staticContent: '/admin/static/content',
  staticCategory: '/admin/static/category',

  //Test
  test: '/test',
};

export default routes;
