import commonFunc from 'common/commonFunc';
import convertHelper from 'helpers/convertHelper';
import axiosClient from './axiosClient';
import datafakeNews from './datafake/datafakeNews';

class NewsApi {
  getNewsAll = (body) => {
    const url = '/newsPost/filter';
    return axiosClient.post(url, body);

    // var response = commonFunc.generateFakeData(
    //   20,
    //   50,
    //   datafakeNews.news.objectExample
    // );
    // return response;
  };

  getNewsById = (params) => {
    // const url = '/news';
    // return axiosClient.get(url, { params });

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(datafakeNews.news.objectExample);
      });
    }, 2000);

    // var response = datafakeNews.news.objectExample;
    // return response;
  };

  getNewsHotAll = (params) => {
    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeNews.news.objectExample
    );
    return response;
  };

  getNewsCommentAll = (params) => {
    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeNews.Comment.objectExample
    );
    return response;
  };

  getNewsSourceAll = (body) => {
    const url = '/sourceNews/filter';
    return axiosClient.post(url, body);
  };

  getNewsFieldAll = (params) => {
    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeNews.Field.objectExample
    );
    return response;
  };

  getNewsCategoryAll = (params) => {
    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeNews.Category.objectExample
    );
    return response;
  };

  getNewsCategoryById = (params) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(datafakeNews.Category.objectExample);
      });
    }, 2000);
  };

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
    var formData = new FormData();
    formData.append('JsonString', convertHelper.Serialize(body));
    return axiosClient.post(url, formData);
  };

  insertSourceNew = (body) => {
    const url = '/sourceNews';
    return axiosClient.post(url, body);
  };

  deleteSourceNew = (id) => {
    const url = `/sourceNews/${id}`;
    return axiosClient.delete(url);
  };
}
const newsApi = new NewsApi();
export default newsApi;
