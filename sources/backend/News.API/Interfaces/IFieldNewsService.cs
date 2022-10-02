using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IFieldNewsService
    {
        Task<ApiSuccessResult<FieldNewsDto>>
        GetFieldNewsByPaging(
            FieldNewsRequest fieldNewsRequest
        );

        Task<FieldNews> GetFieldNews(int id);

        Task CreateFieldNews(FieldNews FieldNews);

        Task UpdateFieldNews(FieldNews FieldNews);

        Task DeleteFieldNews(int id);
    }
}
