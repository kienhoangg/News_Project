import axiosClient from "apis/axiosClient";

class HomeApi {
    getData = (params) => {
        const url = '/home';
        return axiosClient.get(url, {});

        // var response = datafakeHome;
        // return response;
    };

    /**
     * Convert dữ liệu lấy từ API sang dữ liệu hiển thị UI
     * @param {object} dataApi Dữ liệu lấy từ API
     */
    convertDataApiToDataUI(dataApi) {

    }

}
const homeApi = new HomeApi();
export default homeApi;
