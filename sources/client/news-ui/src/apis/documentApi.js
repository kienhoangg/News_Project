import commonFunc from 'common/commonFunc';
import datafakeDocument from './datafake/datafakeDocument';
import axiosClient from './axiosClient';

class DocumentApi {
  getDocumentAll = (body) => {
    const url = '/Documents/filter';
    return axiosClient.post(url, body);
  };
  insertDocument = (body) => {
    const url = '/Documents';
    return axiosClient.post(url, body);
  };
  deleteDocument = (id) => {
    const url = `/Documents/${id}`;
    return axiosClient.delete(url);
  };

  // Loại văn bản
  getDocumentCategoryAll = (body) => {
    const url = '/DocumentTypes/filter';
    return axiosClient.post(url, body);
  };
  insertCategoryDocument = (body) => {
    const url = '/DocumentTypes';
    return axiosClient.post(url, body);
  };
  deleteCategoryDocument = (id) => {
    const url = `/DocumentTypes/${id}`;
    return axiosClient.delete(url);
  };

  // Cơ quan ban hành
  getDocumentSourceAll = (body) => {
    const url = '/DocumentDepartments/filter';
    return axiosClient.post(url, body);
  };
  insertSourceDocument = (body) => {
    const url = '/DocumentDepartments';
    return axiosClient.post(url, body);
  };
  deleteSourceDocument = (id) => {
    const url = `/DocumentDepartments/${id}`;
    return axiosClient.delete(url);
  };

  // Lĩnh vực
  getDocumentFieldAll = (body) => {
    const url = '/documentfields/filter';
    return axiosClient.post(url, body);
  };
  insertFieldDocument = (body) => {
    const url = '/documentfields';
    return axiosClient.post(url, body);
  };
  deleteFieldDocument = (id) => {
    const url = `/documentfields/${id}`;
    return axiosClient.delete(url);
  };

  // Người ký
  getDocumentSingerAll = (body) => {
    const url = '/documentsignpersons/filter';
    return axiosClient.post(url, body);
  };
  insertSingerDocument = (body) => {
    const url = '/documentsignpersons';
    return axiosClient.post(url, body);
  };
  deleteSingerDocument = (id) => {
    const url = `/documentsignpersons/${id}`;
    return axiosClient.delete(url);
  };
}
const documentApi = new DocumentApi();
export default documentApi;
