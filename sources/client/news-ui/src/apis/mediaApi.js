import commonFunc from 'common/commonFunc';
import datafakeMedia from './datafake/datafakeMedia';
import axiosClient from './axiosClient';

class MediaApi {
  getImageAll = (body) => {
    const url = '/Photos/filter';
    return axiosClient.post(url, body);
  };
  insertImage = (body) => {
    const url = '/Photos';
    return axiosClient.post(url, body);
  };
  deleteImage = (id) => {
    const url = `/Photos/${id}`;
    return axiosClient.delete(url);
  };

  getImageCategoryAll = (body) => {
    const url = '/PhotoCategories/filter';
    return axiosClient.post(url, body);
  };
  insertImageCategory = (body) => {
    const url = '/PhotoCategories';
    return axiosClient.post(url, body);
  };
  deleteImageCategory = (id) => {
    const url = `/PhotoCategories/${id}`;
    return axiosClient.delete(url);
  };

  getVideoAll = (params) => {
    // const url = '/news';
    // return axiosClient.get(url, { params });

    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeMedia.videoItem.objectExample
    );
    return response;
  };

  getVideoCategoryAll = (params) => {
    // const url = '/news';
    // return axiosClient.get(url, { params });

    var response = commonFunc.generateFakeData(
      20,
      50,
      datafakeMedia.videoCategory.objectExample
    );
    return response;
  };
}
const mediaApi = new MediaApi();
export default mediaApi;
