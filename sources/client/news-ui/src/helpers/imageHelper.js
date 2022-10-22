import { envDomainClient } from "common/enviroments";

const imageHelper = {

    /**
     * Lấy đường dẫn hình ảnh hiển thị trong Client
     * @param {string} url Đường dẫn Url lấy từ API
     */
    getLinkImageUrl(urlApi) {
        if (urlApi) {
            if (urlApi.startsWith("http://") || urlApi.startsWith("https://")) {
                return urlApi;
            }

            if (urlApi.startsWith("/")) {
                return urlApi;
            }

            let result = `${envDomainClient}/{urlApi}`;
            return result;
        }

        return undefined;
    }
}


export default imageHelper;