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

  getCategoryFilter = (body) => {
    const url = '/questioncategories/filter';
    return axiosClient.post(url, body);

    // var response = {
    //   data: datafakeQuestion.category.examples,
    //   total: 5,
    // };
    // return response;
  };


  insertQuestionCategory = (body) => {
    const url = '/questioncategories';
    return axiosClient.post(url, body);
  };

  updateQuestionCategory = (id, body) => {
    const url = '/questioncategories/' + id;
    return axiosClient.post(url, body);
  };

  updateStatusQuestionCategory = (body) => {
    const url = '/questioncategories';
    return axiosClient.put(url, body);
  };

  updateStatusQuestion = (body) => {
    const url = "/Questions";
    return axiosClient.put(url, body);
  };
}

const questionApi = new QuestionApi();
export default questionApi;
