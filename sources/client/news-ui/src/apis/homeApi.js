// import axiosClient from './axiosClient';
import datafakeHome from './datafake/datafakeHome';

class HomeApi {
    getData = (params) => {
        // const url = '/home';
        // return axiosClient.get(url, {});

        var response = datafakeHome;
        return response;
    };
}
const homeApi = new HomeApi();
export default homeApi;
