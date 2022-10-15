import commonFunc from 'common/commonFunc';
import axiosClient from './axiosClient';
import datafakeNews from './datafake/datafakeNews';

class NewsApi {
  getNewsAll = (body) => {
    const url = '/newsPost/filter';
    return axiosClient.post(url, body);
  };
  updateHotNews = (body) => {
    const url = '/newsPost';
    return axiosClient.put(url, body);
  };
  deleteHotNew = (id) => {
    const url = `/newsPost/${id}`;
    return axiosClient.delete(url);
  };

  getNewsById = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(datafakeNews.news.objectExample);
      });
    }, 2000);
  };

  getNewsCommentAll = (params) => {
    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeNews.Comment.objectExample
    );
    return response;
  };
  //#region Nguồn tin
  getNewsSourceAll = (body) => {
    const url = '/sourceNews/filter';
    return axiosClient.post(url, body);
  };

  insertSourceNew = (body) => {
    const url = '/sourceNews';
    return axiosClient.post(url, body);
  };

  deleteSourceNew = (id) => {
    const url = `/sourceNews/${id}`;
    return axiosClient.delete(url);
  };
  //#endregion

  //#endregion Lĩnh vực
  getNewsFieldAll = (body) => {
    const url = '/fieldNews/filter';
    return axiosClient.post(url, body);
  };

  insertFieldNews = (body) => {
    const url = '/fieldNews';
    return axiosClient.post(url, body);
  };

  deleteFieldNews = (id) => {
    const url = `/fieldNews/${id}`;
    return axiosClient.delete(url);
  };
  //#endregion

  //#region Danh mục
  getNewsCategoryAll = (body) => {
    const url = '/categoryNews/filter';
    return axiosClient.post(url, body);
  };

  insertCategoryNews = (body) => {
    const url = '/categoryNews';
    return axiosClient.post(url, body);
  };

  deleteCategoryNews = (id) => {
    const url = `/categoryNews/${id}`;
    return axiosClient.delete(url);
  };

  getNewsCategoryById = (id) => {
    const url = `/categoryNews/${id}`;
    return axiosClient.get(url);
  };
  //#endregion

  getNewsCollaboratorsAll = (params) => {
    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeNews.Collaborators.objectExample
    );
    return response;
  };

  insertNew = (body) => {
    const url = '/newsPost';
    return axiosClient.post(url, body, {
      headers: {
        Prefer: 'code=200, example=200GetReturn2Record',
        'Content-Type': 'multipart/form-data',
      },
    });
  };
}
const newsApi = new NewsApi();
export default newsApi;
