using System;
using Models.Entities;
using ILogger = Serilog.ILogger;
namespace News.API.Persistence
{
    public class NewsContextSeed
    {
        public static async Task SeedProductAsync(NewsContext newsContext,
                                                  ILogger logger)
        {
            if (!newsContext.Documents.Any())
            {
                newsContext.AddRange(GetNewsProducts());
                await newsContext.SaveChangesAsync();
                logger.Information(
                    "Seeded data for News DB associated with context {DbContextName}",
                    nameof(NewsContext));
            }
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
                       FilePath = "abc/xyz/aaa.pdf"
                   },
                   new()
                   {
                      Code = "KTIFF",
                       Name = "Công báo số 19 năm 2022",
                       ExpiredDate = DateTime.Now,
                       PublishedDate = DateTime.Now,
                       FilePath = "abc/xyz/bbb.pdf"
                   }
               };
        }
    }
}

