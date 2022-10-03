import commonFunc from "common/commonFunc";
// import axiosClient from "./axiosClient";
import datafakeNews from "./datafake/datafakeNews";

class NewsApi {
    getNewsAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeNews.news.objectExample);
        return response;
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
        var response = commonFunc.generateFakeData(20, 50, datafakeNews.news.objectExample);
        return response;
    };

    getNewsCommentAll = (params) => {
        var response = commonFunc.generateFakeData(20, 50, datafakeNews.Comment.objectExample);
        return response;
    };

    getNewsSourceAll = (params) => {
        var response = commonFunc.generateFakeData(20, 50, datafakeNews.Source.objectExample);
        return response;
    };

    getNewsFieldAll = (params) => {
        var response = commonFunc.generateFakeData(20, 50, datafakeNews.Field.objectExample);
        return response;
    };

    getNewsCategoryAll = (params) => {
        var response = commonFunc.generateFakeData(20, 50, datafakeNews.Category.objectExample);
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
        var response = commonFunc.generateFakeData(20, 50, datafakeNews.Collaborators.objectExample);
        return response;
    };
}
const newsApi = new NewsApi();
export default newsApi;