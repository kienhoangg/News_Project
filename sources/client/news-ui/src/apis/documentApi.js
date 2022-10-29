import commonFunc from "common/commonFunc";
import datafakeDocument from "./datafake/datafakeDocument";
import axiosClient from "./axiosClient";

class DocumentApi {
  updateNewPost = (id, body) => {
    const url = "/newspost/" + id;
    return axiosClient.put(url, body);
  };

  getDocumentAll = (body) => {
    const url = "/Documents/filter";
    return axiosClient.post(url, body);
  };

  insertDocument = (body) => {
    const url = "/Documents";
    return axiosClient.post(url, body);
  };

  updateDocument = (id, body) => {
    const url = "/documents/" + id;
    return axiosClient.put(url, body);
  };

  updatStatusDocument = (body) => {
    const url = "/Documents";
    return axiosClient.put(url, body);
  };

  deleteDocument = (id) => {
    const url = `/Documents/${id}`;
    return axiosClient.delete(url);
  };

  // Loại văn bản
  getDocumentCategoryAll = (body) => {
    const url = "/DocumentTypes/filter";
    return axiosClient.post(url, body);
  };
  insertCategoryDocument = (body) => {
    const url = "/DocumentTypes";
    return axiosClient.post(url, body);
  };
  updateCategoryDocument = (id, body) => {
    const url = "/DocumentTypes/" + id;
    return axiosClient.put(url, body);
  };
  updatStatusCategoryDocument = (body) => {
    const url = "/DocumentTypes";
    return axiosClient.put(url, body);
  };
  deleteCategoryDocument = (id) => {
    const url = `/DocumentTypes/${id}`;
    return axiosClient.delete(url);
  };

  // Cơ quan ban hành
  getDocumentSourceAll = (body) => {
    const url = "/DocumentDepartments/filter";
    return axiosClient.post(url, body);
  };
  insertSourceDocument = (body) => {
    const url = "/DocumentDepartments";
    return axiosClient.post(url, body);
  };
  updatStatusSourceDocument = (body) => {
    const url = "/DocumentDepartments";
    return axiosClient.put(url, body);
  };
  deleteSourceDocument = (id) => {
    const url = `/DocumentDepartments/${id}`;
    return axiosClient.delete(url);
  };

  // Lĩnh vực
  getDocumentFieldAll = (body) => {
    const url = "/documentfields/filter";
    return axiosClient.post(url, body);
  };
  insertFieldDocument = (body) => {
    const url = "/documentfields";
    return axiosClient.post(url, body);
  };
  updatStatusFieldDocument = (body) => {
    const url = "/documentfields";
    return axiosClient.put(url, body);
  };
  deleteFieldDocument = (id) => {
    const url = `/documentfields/${id}`;
    return axiosClient.delete(url);
  };

  // Người ký
  getDocumentSingerAll = (body) => {
    const url = "/documentsignpersons/filter";
    return axiosClient.post(url, body);
  };
  insertSingerDocument = (body) => {
    const url = "/documentsignpersons";
    return axiosClient.post(url, body);
  };
  updatStatusSingerDocument = (body) => {
    const url = "/documentsignpersons";
    return axiosClient.put(url, body);
  };
  deleteSingerDocument = (id) => {
    const url = `/documentsignpersons/${id}`;
    return axiosClient.delete(url);
  };
}
const documentApi = new DocumentApi();
export default documentApi;
