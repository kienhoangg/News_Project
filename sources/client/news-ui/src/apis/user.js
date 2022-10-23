import axiosClient from './axiosClient';

class UserAPI {
  login = (body) => {
    const url = '/users';
    return axiosClient.post(url, body);
  };
}
const userApi = new UserAPI();
export default userApi;
