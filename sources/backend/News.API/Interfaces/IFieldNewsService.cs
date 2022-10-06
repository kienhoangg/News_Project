using System.Linq.Expressions;
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

                FieldNewsRequest fieldNewsRequest,
                params Expression<Func<FieldNews, object>>[] includeProperties

        );

        Task<FieldNews> GetFieldNews(int id);

        Task CreateFieldNews(FieldNews FieldNews);

        Task UpdateFieldNews(FieldNews FieldNews);

        Task DeleteFieldNews(int id);
    }
}
