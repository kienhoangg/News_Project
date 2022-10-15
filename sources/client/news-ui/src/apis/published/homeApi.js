import axiosClient from "apis/axiosClient";
import datafakeHome, { datafakeIntroduce, datafakeMenuPageData } from "apis/datafake/datafakeHome";

class HomeApi {
    getData = (params) => {
        // const url = '/home';
        // return axiosClient.get(url, {});

        var response = {
            Data: datafakeHome
        };
        return response;
    };


    getIntroduceData = (params) => {
        // const url = '/home';
        // return axiosClient.get(url, {});

        var response = datafakeIntroduce;
        return response;
    };

    getMenuPageData = (params) => {
        // const url = '/home';
        // return axiosClient.get(url, {});

        var response = datafakeMenuPageData;
        return response;
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
