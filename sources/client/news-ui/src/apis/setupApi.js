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
  updateMenu = (id, body) => {
    const url = `/menus/${id}`;
    return axiosClient.put(url, body);
  };
  getMenuById = (id) => {
    const url = `/menus/${id}`;
    return axiosClient.get(url);
  };
  deleteMenu = (id) => {
    const url = `/home/menu/${id}`;
    return axiosClient.delete(url);
  };
}
const setupApi = new SetupAPI();
export default setupApi;
