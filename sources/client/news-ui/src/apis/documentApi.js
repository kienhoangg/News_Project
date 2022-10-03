import commonFunc from "common/commonFunc";
import datafakeDocument from "./datafake/datafakeDocument";
// import axiosClient from "./axiosClient";

class DocumentApi {
    getDocumentAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeDocument.item.objectExample);
        return response;
    };

    getDocumentCategoryAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeDocument.category.objectExample);
        return response;
    };

    getDocumentSourceAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeDocument.source.objectExample);
        return response;
    };

    getDocumentFieldAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeDocument.field.objectExample);
        return response;
    };

    getDocumentSingerAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeDocument.singer.objectExample);
        return response;
    };
}
const documentApi = new DocumentApi();
export default documentApi;