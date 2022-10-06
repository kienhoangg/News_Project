// import axiosClient from './axiosClient';

import datafakePublisedNews from "apis/datafake/datafakePublisedNews";

class PublishedNewsApi {
    getData = (params) => {
        // const url = '/home';
        // return axiosClient.get(url, {});

        var response = datafakePublisedNews.objectExample;
        return response;
    };
}
const publishedNewsApi = new PublishedNewsApi();
export default publishedNewsApi;
