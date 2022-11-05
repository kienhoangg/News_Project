// import axiosClient from './axiosClient';

import axiosClient from 'apis/axiosClient';
import datafakePublisedNews from 'apis/datafake/datafakePublisedNews';
import datafakePublishedCategoryList from 'apis/datafake/datafakePublishedCategoryList';
import datafakePublishedDocument from 'apis/datafake/datafakePublishedDocument';
import moment from 'moment';

class PublishedNewsApi {
  getData = (params) => {
    // const url = '/home';
    const { id } = params;
    let url = `/home/published/${id}`;
    return axiosClient.get(url, {});

    // var response = datafakePublisedNews.objectExample;
    // return response;
  };

  getComments() {
    var response = datafakePublishedCategoryList;
    return response;
  }

  getFieldsDataListPage() {
    let url = `/home/published/fields`;
    return axiosClient.get(url, {});

    // var response = datafakePublishedCategoryList;
    // return response;
  }

  getFieldsDataPage(params) {
    const { id, currentPage, todayDate } = params;
    const url = `/home/published/fieldNews/${id}`;
    const body = {
      CurrentPage: currentPage,
      PageSize: 6,
    };

    if (todayDate) {
      const formatDateApi = 'YYYY-MM-DD';
      body.TodayDate = moment(todayDate, 'DD/MM/YYYY').format(formatDateApi);
    }

    return axiosClient.post(url, body);

    // var response = {
    //     data: {
    //         field: datafakePublishedDocument.field,
    //         category: datafakePublishedDocument.category
    //     },
    //     total: 20
    // }
    // return response;
  }

  getInternationalTreatiesPage(body) {
    const url = `/home/published/categorynews`;
    return axiosClient.get(url);
  }

  getInternationalLawDissemination(body) {
    const url = `/home/published/categorynews`;
    return axiosClient.post(url, body);
  }

  postVisitorComment(params) {
    const url = `/home/comment`;
    const body = params;

    return axiosClient.post(url, body);
  }
}
const publishedNewsApi = new PublishedNewsApi();
export default publishedNewsApi;
