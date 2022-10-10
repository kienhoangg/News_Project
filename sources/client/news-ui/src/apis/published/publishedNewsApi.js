// import axiosClient from './axiosClient';

import axiosClient from "apis/axiosClient";
import datafakePublisedNews from "apis/datafake/datafakePublisedNews";
import datafakePublishedCategoryList from "apis/datafake/datafakePublishedCategoryList";

class PublishedNewsApi {
    getData = (params) => {
        // const url = '/home';
        const { id } = params;
        let url = `/newsPost/published/${id}`;
        return axiosClient.get(url, {});

        // var response = datafakePublisedNews.objectExample;
        // return response;
    };

    getComments() {
        var response = datafakePublishedCategoryList;
        return response;
    }

    getFieldsDataListPage() {
        var response = datafakePublishedCategoryList;
        return response;
    }
}
const publishedNewsApi = new PublishedNewsApi();
export default publishedNewsApi;
