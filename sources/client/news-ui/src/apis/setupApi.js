import axiosClient from './axiosClient';

class SetupAPI {
  getMenuAll = (body) => {
    const url = '/home/menu';
    return axiosClient.get(url);
  };
  insertMenu = (body) => {
    const url = '/home/menu';
    return axiosClient.post(url, body);
  };
  deleteMenu = (id) => {
    const url = `/home/menu/${id}`;
    return axiosClient.delete(url);
  };
}
const setupApi = new SetupAPI();
export default setupApi;
