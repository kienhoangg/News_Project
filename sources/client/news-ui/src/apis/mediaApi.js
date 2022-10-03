import commonFunc from "common/commonFunc";
import datafakeMedia from "./datafake/datafakeMedia";
// import axiosClient from "./axiosClient";

class MediaApi {
    getImageAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeMedia.imageItem.objectExample);
        return response;
    };

    getImageCategoryAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeMedia.imageCategory.objectExample);
        return response;
    };


    getVideoAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeMedia.videoItem.objectExample);
        return response;
    };

    getVideoCategoryAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeMedia.videoCategory.objectExample);
        return response;
    };

}
const mediaApi = new MediaApi();
export default mediaApi;