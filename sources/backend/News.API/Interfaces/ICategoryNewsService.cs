using System.Linq.Expressions;
using Common.Enums;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface ICategoryNewsService
    {
        Task<ApiSuccessResult<CategoryNewsDto>>
        GetCategoryNewsByPaging(
            CategoryNewsRequest CategoryNewsRequest
        );

        Task<CategoryNews> GetCategoryNews(int id);

        Task CreateCategoryNews(CategoryNews categoryNews);

        Task UpdateCategoryNews(CategoryNews categoryNews);

        Task DeleteCategoryNews(int id);

        Task<CategoryNews> GetCategoryNewsByCondition(Expression<Func<CategoryNews, bool>> expression);

        Task UpdateManyCategoryNewsDto(List<int> lstCategoryNewsId, bool value, MultipleTypeUpdate multipleTypeUpdate);

        public IQueryable<Comment> GetCommentByCategoryNews(CommentRequest commentRequest);
    }
}
