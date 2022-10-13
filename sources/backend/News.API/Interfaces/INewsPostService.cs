using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface INewsPostService
    {
        Task<ApiSuccessResult<NewsPostDto>>
        GetNewsPostByPaging(

                NewsPostRequest newsPostRequest,
                params Expression<Func<NewsPost, object>>[] includeProperties

        );
        Task<NewsPostCategoryEachFieldsDto> GetNewsPostCategoryEachFields(int fieldNewsid, NewsPostRequest newsPostRequest);
        Task<NewsPost>
        GetNewsPost(

                long id,
                params Expression<Func<NewsPost, object>>[] includeProperties

        );

        Task CreateNewsPost(NewsPost newsPost);

        Task<int> UpdateNewsPost(NewsPost newsPost);

        Task<int> DeleteNewsPost(long id);
        Task UpdateManyNewsPostDto(List<long> lstNewsPostId);
    }
}
