import routes from "config/configRoutes";


export const commonRenderTable = {
    showTableTotalPagination: (total, pageSize) => {
        return `Tổng có ${total} bản ghi`;
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
    * Lấy link đường dần danh sách tin tức theo loại tin tức
    * @param {string} id ID của loại tin tức
    * @returns Đường dẫn chi tiết tin tức
    */
    renderLinkNewsCategory: (id) => {
        var link = routes.publishedNewsPostCategory.replace(":id", id);
        return link;
    }
}



export default commonRender;