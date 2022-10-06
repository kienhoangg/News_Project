using System;
using Models.Entities;
using Models.Entities.News;
using ILogger = Serilog.ILogger;
namespace News.API.Persistence
{
    public class NewsContextSeed
    {
        public static async Task SeedProductAsync(NewsContext newsContext,
                                                  ILogger logger)
        {

            //  if (!newsContext.Collaborators.Any())
            // {
            //     newsContext.AddRange(GetCollaborators());
            // }
            // if (!newsContext.Documents.Any())
            // {
            //     newsContext.AddRange(GetNewsProducts());
            // }
            // if (!newsContext.FieldNews.Any())
            // {
            //     newsContext.AddRange(GetFieldNews());
            // }
            //   if (!newsContext.NewsPosts.Any())
            // {
            //     newsContext.AddRange(GetNewsPost());
            // }
             if (!newsContext.CategoryNews.Any())
            {
                newsContext.AddRange(GetCategoryNews());
                   await newsContext.SaveChangesAsync();
                    newsContext.AddRange(GetCategoryParentsNews());
                      await newsContext.SaveChangesAsync();
            }
              if (!newsContext.NewsPosts.Any())
            {
                newsContext.AddRange(GetNewsPostV2());
            }
            //  if (!newsContext.SourceNews.Any())
            // {
            //     newsContext.AddRange(GetSourceNews());
            // }

           
                await newsContext.SaveChangesAsync();
                logger.Information(
                    "Seeded data for News DB associated with context {DbContextName}",
                    nameof(NewsContext));
        }

         private static IEnumerable<FieldNews> GetFieldNews()
        {
            return new List<FieldNews>
               {
                   new FieldNews()
                   {
                      Title = "An ninh - Quốc phòng",
                      Order = 0,
                      Description = "An ninh - Quốc phòng",
                      Factor = 1.5M,
                      BiggestFactor = 2,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                      
                   },
                   new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   }
               };
        }

        private static IEnumerable<NewsPost> GetNewsPostV2()
        {
            return new List<NewsPost>
            {
                new NewsPost()
                   {
                     Title = "Hội nghị bàn các giải pháp tháo gỡ khó khăn cho các doanh nghiệp chế biến nông, lâm sản", 
                    PublishedDate = DateTime.Now,
                    Description = "CTTĐT - Chiều 6/10, Sở Công Thương tổ chức Hội nghị các doanh nghiệp sản xuất chế biến nông, lâm sản, thực phẩm trên địa bàn tỉnh năm 2022; bàn giải pháp tháo gỡ khó khăn cho các doanh nghiệp hoạt động ổn định và phát triển trong thời gian tới.",
                    IsHotNews = true,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                    Avatar = "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Hien-Trang/hoi%20nghi/06102022_hoinghidoanhnghiepchebien.jpg", 
                    AvatarTitle = "Quang cảnh hội nghị.",
                    CategoryNewsId = 1,
                      FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   },
                   new NewsPost()
                   {
                     Title = "Phó Chủ tịch Thường trực UBND tỉnh Nguyễn Thế Phước tham dự sinh hoạt chi bộ thôn Thanh Lương, xã Tân Thịnh, thành phố Yên Bái", 
                    PublishedDate = DateTime.Now,
                    IsHotNews = true,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                   Description = "CTTĐT - Chiều 6/10, đồng chí Nguyễn Thế Phước - Ủy viên Ban Thường vụ Tỉnh ủy, Phó Chủ tịch Thường trực UBND tỉnh dự buổi sinh hoạt Chi bộ thôn Thanh Lương, xã Tân Thịnh, Thành phố Yên Bái. Cùng dự buổi sinh hoạt có lãnh đạo Thành ủy Yên Bái.",
                    Avatar = "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thanh-Thuy/2019/Hoinghi/anhphuoc-thanhluong2.jpg", 
                    AvatarTitle = "Đồng chí Nguyễn Thế Phước - Phó Chủ tịch Thường trực UBND tỉnh phát biểu tại Hội nghị",
                    CategoryNewsId = 1,
                      FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   },
                      new NewsPost()
                   {
                     Title = "Yên Bái ban hành Quy định điều kiện, trình tự, thủ tục, hồ sơ xét, công nhận, công bố và thu hồi quyết định công nhận thôn (bản) đạt chuẩn NTM; thôn (bản) đạt chuẩn NTM kiểu mẫu trên địa bàn tỉnh giai đoạn 2021-2025", 
                    PublishedDate = DateTime.Now,
                    IsHotNews = true,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                   Description = "CTTĐT - Tại Quyết định số 1739/QĐ-UBND ban hành ngày 04/10/2022, UBND tỉnh đã Quy định điều kiện, trình tự, thủ tục, hồ sơ xét, công nhận, công bố và thu hồi quyết định công nhận thôn (bản) đạt chuẩn NTM; thôn (bản) đạt chuẩn NTM kiểu mẫu trên địa bàn tỉnh giai đoạn 2021-2025.",
                    Avatar = "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thu-Nga/2022/200090_lang-van-hoa.jpg", 
                    AvatarTitle = "Cổng vào Làng văn hóa thôn Làng Già, xã Yên Thắng, huyện Lục Yên - thôn nông thôn mới kiểu mẫu",
                    CategoryNewsId = 5,
                      FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   },
                    new NewsPost()
                   {
                     Title = "Tăng cường công tác chăm sóc sức khỏe người lao động và phòng chống bệnh nghề nghiệp", 
                    PublishedDate = DateTime.Now,
                    IsHotNews = true,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                   Description = "CTTĐT - UBND tỉnh vừa ban hành công văn số 3341/UBND-VX yêu cầu các sở, ban, ngành của tỉnh; UBND các huyện, thị xã, thành phố và các đơn vị liên quan về việc tăng cường công tác chăm sóc sức khỏe người lao động và phòng chống bệnh nghề nghiệp.",
                    Avatar = "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thu-Nga/2022/185331_dam-bao-van-hanh.jpg", 
                    AvatarTitle = "Công ty Điện lực Yên Bái khám sức khỏe định kỳ cho cán bộ, công nhân viên và người lao động.",
                    CategoryNewsId = 5,
                      FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   
                   },
                    new NewsPost()
                   {
                     Title = "Nhiều hoạt động đặc sắc tại Lễ hội Quế Văn Yên năm 2022", 
                    PublishedDate = DateTime.Now,
                    IsHotNews = true,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                   Description = "CTTĐT - Lễ hội Quế huyện Văn Yên lần thứ IV năm 2022 với chủ đề “Quế Văn Yên - khát vọng vươn xa” sẽ diễn ra trong 2 ngày 14 và 15/10/2022 với nhiều hoạt động văn hóa, nghệ thuật, du lịch đặc sắc đón chào du khách gần xa.",
                    Avatar = "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thu-Nga/2022/le%20hoi%20que%20vy%205102022.jpg", 
                    AvatarTitle = "Lễ khai mạc lễ hội sẽ diễn ra vào tối ngày 14/10",
                    CategoryNewsId = 6,
                      FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   },
                    new NewsPost()
                   {
                     Title = "Hội LHPN huyện Văn Yên tổ chức Chung kết Hội thi tìm hiểu Nghị quyết Đại hội phụ nữ các cấp năm 2022", 
                    PublishedDate = DateTime.Now,
                    IsHotNews = false,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                   Description = "CTTĐT - Sáng ngày 4/10, Hội LHPN huyện Văn Yên tổ chức Chung kết Hội thi tìm hiểu Nghị quyết Đại hội đại biểu phụ nữ toàn quốc lần thứ 13, Nghị quyết Đại hội đại biểu phụ nữ tỉnh và Nghị quyết Đại hội đại biểu phụ nữ huyện Văn Yên lần thứ 16.",
                    Avatar = "https://yenbai.gov.vn/noidung/tintuc/PublishingImages/Thu-Nga/2022/trao%20giai%20nhat%204102022.jpg", 
                    AvatarTitle = "Ban Tổ chức đã trao giải nhất cho thí sinh Nguyễn Thị Bích Liên - Phó Chủ tịch Hội LHPN xã Viễn Sơn",
                    CategoryNewsId = 5,
                      FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   
                   }
            };
        }


        private static IEnumerable<NewsPost> GetNewsPost()
        {
            return new List<NewsPost>
               {
                   new NewsPost()
                   {
                      CategoryNews =  new CategoryNews()
                   {
                      CategoryNewsName = "Tin tức",
                      Order = 0,
                      ParentId = 0,
                      FieldNews_SK_FK = 1,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                       FieldNews = new FieldNews()
                   {
                      Title = "An ninh - Quốc phòng",
                      Order = 0,
                      Description = "An ninh - Quốc phòng",
                      Factor = 1.5M,
                      BiggestFactor = 2,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                      
                   },
                   },
                      Title = "Văn Chấn yêu cầu chủ động phòng ngừa, ứng phó thiên tai những tháng cuối năm 2022", 
                    PublishedDate = DateTime.Now,
                    IsHotNews = true,
                    IsVideoNews = false,
                    IsShowTitle = true,
                    IsShowAvatar = true,
                    IsShowComment = true,
                    Avatar = "avatar.png", 
                    AvatarTitle = "AvatarTitle",
                    FieldNews =  new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                    SourceNews =  new SourceNews()
                   {
                       Title = "Bộ Lao động - Thương binh và Xã hội",
                      Order = 0,
                      Description = "Bộ Lao động - Thương binh và Xã hội",
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   Collaborator =    new Collaborator()
                   {
                      Name = "A Cớ",
                      BirthDate = DateTime.Now,
                      Username = "abcabc123", 
                      Address = "123 Lạc long quân",   
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                      Comments = new List<Comment>(){
                        new Comment(){
                           Username = "BVMINH",
                           Content = "That tuyet voi",
                             CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                        }
                       
                      }
                   },
                  new NewsPost()
                   {
                      CategoryNews =  new CategoryNews()
                   {
                      CategoryNewsName = "Tin tức",
                      Order = 0,
                      ParentId = 0,
                      FieldNews_SK_FK = 1,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                      FieldNews = new FieldNews()
                   {
                      Title = "An ninh - Quốc phòng",
                      Order = 0,
                      Description = "An ninh - Quốc phòng",
                      Factor = 1.5M,
                      BiggestFactor = 2,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                      
                   },
                   },
                      Title = "Yên Bái tăng cường công tác chống buôn lậu, gian lận thương mại và hàng giả trên địa bàn nội địa",
                    PublishedDate = DateTime.Now,
                    IsHotNews = false,
                    IsVideoNews = true,
                    IsShowTitle = false,
                    IsShowAvatar = true,
                    IsShowComment = false,
                    Avatar = "avatar1.png", 
                    AvatarTitle = "AvatarTitle1",
                    FieldNews =   new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                    SourceNews =  new SourceNews()
                   {
                      Title = "Báo Tin tức TTXVN",
                      Order = 0,
                      Description = "Báo Tin tức TTXVN",

                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   Collaborator =     new Collaborator()
                   {
                      Name = "A Cớ",
                      BirthDate = DateTime.Now, 
                      Username = "cccc123", 
                      Address = "123 Thuỵ Khuê",   
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                       Comments = new List<Comment>(){
                        new Comment(){
                           Username = "KIENHT12",
                           Content = "This one is awesome",
                             CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                        },
                        new Comment(){
                           Username = "DVHUNG1",
                           Content = "amzing gút chóp",
                             CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                        }
                      }
                   },
               };
        }


        private static IEnumerable<CategoryNews> GetCategoryNews()
        {
            return new List<CategoryNews>
               {
                    new CategoryNews()
                   {
                      CategoryNewsName = "Tin Tức",
                      Order = 0,
                      ParentId = 0,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                     new CategoryNews()
                   {
                      CategoryNewsName = "Dư địa chí YB",
                      Order = 0,
                      ParentId = 0,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                     new CategoryNews()
                   {
                      CategoryNewsName = "Tin giao thông",
                      Order = 0,
                      ParentId = 0,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
               };
        }

         private static IEnumerable<CategoryNews> GetCategoryParentsNews()
        {
            return new List<CategoryNews>
               {
                    new CategoryNews()
                   {
                      CategoryNewsName = "Chính sách mới",
                      Order = 0,
                      ParentId = 1,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                     new CategoryNews()
                   {
                      CategoryNewsName = "Tin trong tỉnh",
                      Order = 0,
                      ParentId = 1,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                     new CategoryNews()
                   {
                      CategoryNewsName = "Tin Sở ngành địa phương",
                      Order = 0,
                      ParentId = 1,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
               };
        }


        private static IEnumerable<SourceNews> GetSourceNews()
        {
            return new List<SourceNews>
               {
                   new SourceNews()
                   {
                      Title = "Báo Tin tức TTXVN",
                      Order = 0,
                      Description = "Báo Tin tức TTXVN",

                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   new()
                   {
                       Title = "Bộ Lao động - Thương binh và Xã hội",
                      Order = 0,
                      Description = "Bộ Lao động - Thương binh và Xã hội",
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   }
               };
        }

        private static IEnumerable<Collaborator> GetCollaborators()
        {
            return new List<Collaborator>
               {
                   new Collaborator()
                   {
                      Name = "A Cớ",
                      BirthDate = DateTime.Now,
                      Username = "abcabc123", 
                      Address = "123 Lạc long quân",   
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   new Collaborator()
                   {
                      Name = "A Cớ",
                      BirthDate = DateTime.Now, 
                      Username = "cccc123", 
                      Address = "123 Thuỵ Khuê",   
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
               };
        }

        private static IEnumerable<Document> GetNewsProducts()
        {
            return new List<Document>
               {
                   new()
                   {
                       Code = "ABCDE",
                       Name = "Công báo số 18 năm 2021",
                       ExpiredDate = DateTime.Now,
                       PublishedDate = DateTime.Now,
                       FilePath = "abc/xyz/aaa.pdf",
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   },
                   new()
                   {
                      Code = "KTIFF",
                       Name = "Công báo số 19 năm 2022",
                       ExpiredDate = DateTime.Now,
                       PublishedDate = DateTime.Now,
                       FilePath = "abc/xyz/bbb.pdf", 
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   }
               };
        }
    }
}

