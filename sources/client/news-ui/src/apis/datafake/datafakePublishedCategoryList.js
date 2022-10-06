const url = "api/published/news/categories";

const datafakePublishedCategoryList = [
    {
        categoryId: "1",
        categoryTitle: "Chính trị",
        items: [
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
        ]
    },
    {
        categoryId: "2",
        categoryTitle: "Kinh tế",
        items: [
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
            {
                id: "1",
                title: "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái",
                avatarTitle: "avatar tiêu đề",
                avatar: "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg",
                publishedDate: "2022-10-03T00:03:21.0964619",
                description: "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái."
            },
        ]
    }
]

export default datafakePublishedCategoryList;