import commonFunc from 'common/commonFunc';
import datafakeDocument from './datafake/datafakeDocument';
import axiosClient from './axiosClient';

class DocumentApi {
  getDocumentAll = (params) => {
    // const url = '/news';
    // return axiosClient.get(url, { params });

    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeDocument.item.objectExample
    );
    return response;
  };

  getDocumentCategoryAll = (params) => {
    // const url = '/news';
    // return axiosClient.get(url, { params });

    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeDocument.category.objectExample
    );
    return response;
  };

  getDocumentSourceAll = (body) => {
    const url = '/DocumentDepartments/filter';
    return axiosClient.post(url, body);

    // var response = commonFunc.generateFakeData(
    //   20,
    //   50,
    //   datafakeDocument.source.objectExample
    // );
    // return response;
  };

  getDocumentFieldAll = (body) => {
    const url = '/documentfields/filter';
    return axiosClient.post(url, body);

    // var response = commonFunc.generateFakeData(
    //   20,
    //   50,
    //   datafakeDocument.field.objectExample
    // );
    // return response;
  };

  getDocumentSingerAll = (body) => {
    const url = '/documentsignpersons/filter';
    return axiosClient.post(url, body);

    //   var response = commonFunc.generateFakeData(
    //     20,
    //     50,
    //     datafakeDocument.singer.objectExample
    //   );
    //   return response;
  };
}
const documentApi = new DocumentApi();
export default documentApi;
