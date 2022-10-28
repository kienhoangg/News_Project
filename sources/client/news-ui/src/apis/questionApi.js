import commonFunc from "common/commonFunc";
import axiosClient from "./axiosClient";
import datafakeQuestion from "./datafake/datafakeQuestion";
// import axiosClient from "./axiosClient";

class QuestionApi {
  getAll = (body) => {
    const url = "/questions/filter";
    return axiosClient.post(url, body);
  };

  deleteQuestion = (id) => {
    const url = `/Questions/${id}`;
    return axiosClient.delete(url);
  };

  getCategoryAll = (params) => {
    // const url = '/news';
    // return axiosClient.get(url, { params });

    var response = {
      data: datafakeQuestion.category.examples,
      total: 5,
    };
    // var response = commonFunc.generateFakeData(20, 50, datafakeQuestion.category.objectExample);
    return response;
  };

  updateStatusQuestion = (body) => {
    const url = "/Questions";
    return axiosClient.put(url, body);
  };
}

const questionApi = new QuestionApi();
export default questionApi;
