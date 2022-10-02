using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities.News;
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
    }
}
