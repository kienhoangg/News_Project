using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface INewsPostService
    {
        Task<ApiSuccessResult<NewsPostDto>>
        GetNewsPostByPaging(
            NewsPostRequest newsPostRequest
        );

        Task<NewsPost> GetNewsPost(long id);

        Task CreateNewsPost(NewsPost newsPost);

        Task UpdateNewsPost(NewsPost newsPost);

        Task DeleteNewsPost(long id);
    }
}
