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
              if (!newsContext.NewsPosts.Any())
            {
                newsContext.AddRange(GetNewsPost());
            }
             if (!newsContext.CategoryNews.Any())
            {
                newsContext.AddRange(GetCategoryNews());
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

        private static IEnumerable<NewsPost> GetNewsPost()
        {
            return new List<NewsPost>
               {
                   new NewsPost()
                   {
                      CategoryNews =  new CategoryNews()
                   {
                      CategoryNewsName = "Tin trong tỉnh",
                      Order = 0,
                      ParentId = 1,
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
                      CategoryNewsName = "Dư địa chí YB",
                      Order = 0,
                      ParentId = 0,
                      FieldNews_SK_FK = 2,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                       FieldNews = new FieldNews()
                   {
                      Title = "Chương trình công tác tháng",
                      Order = 0,
                      Description = "Chương trình công tác tháng",
                      Factor = 4.5M,
                      BiggestFactor = 5,
                      CreatedBy = "SystemAdmin", 
                      LastModifiedBy ="SystemAdmin",
                   }
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

