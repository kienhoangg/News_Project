import axiosClient from './axiosClient';

class SetupAPI {
  getMenuAll = (body) => {
    const url = '/menus/filter';
    return axiosClient.post(url, body);
  };
  insertMenu = (body) => {
    const url = '/menus';
    return axiosClient.post(url, body);
  };
  deleteMenu = (id) => {
    const url = `/home/menu/${id}`;
    return axiosClient.delete(url);
  };
}
const setupApi = new SetupAPI();
export default setupApi;
