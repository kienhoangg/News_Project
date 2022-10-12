import { notification } from "antd";
import routes from "config/configRoutes";
import datetimeHelper from "helpers/datetimeHelper";


export const commonRenderTable = {
    showTableTotalPagination: (total, pageSize) => {
        return `Tổng có ${total} kết quả`;
    },

}

/**
 * Render chung
 */
export const commonRender = {
    /**
    * Lấy link đường dần chi tiết tin tức theo id
    * @param {string} id ID của tin tức
    * @returns Đường dẫn chi tiết tin tức
    */
    renderLinkNewsDetail: (id) => {
        var link = routes.publishedNewsPost.replace(":id", id);
        return link;
    },

    /**
    * Lấy link đường dần chi tiết tin tức theo id trang in
    * @param {string} id ID của tin tức
    * @returns Đường dẫn chi tiết tin tức trang in
    */
    renderLinkNewsDetailPrint: (id) => {
        var link = routes.publishedNewsPostPrint.replace(":id", id);
        return link;
    },

    /**
    * Lấy link đường dần danh sách tin tức theo loại tin tức
    * @param {string} id ID của loại tin tức
    * @returns Đường dẫn chi tiết tin tức
    */
    renderLinkNewsCategory: (id) => {
        var link = routes.publishedNewsPostCategory.replace(":id", id);
        return link;
    },

    /**
    * Lấy link đường dần danh sách tin tức theo loại tin tức
    * @param {string} id ID của loại tin tức
    * @returns Đường dẫn chi tiết tin tức
    */
    renderLinkNewsField: (id, date = undefined) => {
        var link = routes.publishedNewsPostCategory.replace(":id", id);
        if (date) {
            link = link + `?date=${datetimeHelper.formatDateToDateVN(date)}`;
        }
        return link;
    },

    /**
    * Lấy link đường dần danh sách tin tức theo loại tin tức
    * @param {string} id ID của loại tin tức
    * @returns Đường dẫn chi tiết tin tức
    */
    renderMenuPage: (id) => {
        var link = routes.publishedMenu.replace(":id", id);
        return link;
    },


    /**
     * Hiển thị thông báo todo
     */
    showNotifiTodo: () => {
        notification.open({
            message: 'Thông báo',
            description: 'Tính năng đang được thi công',
            duration: 1
        });
    }
}



export default commonRender;