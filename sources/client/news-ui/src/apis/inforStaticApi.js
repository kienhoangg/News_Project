import axiosClient from './axiosClient';

class InforStaticAPI {
  getContentAll = (body) => {
    const url = '/StaticInfos/filter';
    return axiosClient.post(url, body);
  };
  insertContent = (body) => {
    const url = '/StaticInfos';
    return axiosClient.post(url, body);
  };
  deleteContent = (id) => {
    const url = `/StaticInfos/${id}`;
    return axiosClient.delete(url);
  };

  getStaticCategoryAll = (body) => {
    const url = '/StaticCategories/filter';
    return axiosClient.post(url, body);
  };
}
const inforStaticAPI = new InforStaticAPI();
export default inforStaticAPI;
