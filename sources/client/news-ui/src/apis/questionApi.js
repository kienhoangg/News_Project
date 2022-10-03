import commonFunc from "common/commonFunc";
import datafakeQuestion from "./datafake/datafakeQuestion";
// import axiosClient from "./axiosClient";

class QuestionApi {
    getAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = commonFunc.generateFakeData(20, 50, datafakeQuestion.item.objectExample);
        return response;
    };

    getCategoryAll = (params) => {
        // const url = '/news';
        // return axiosClient.get(url, { params });

        var response = {
            data: datafakeQuestion.category.examples,
            total: 5
        };
        // var response = commonFunc.generateFakeData(20, 50, datafakeQuestion.category.objectExample);
        return response;
    };
}
const questionApi = new QuestionApi();
export default questionApi;