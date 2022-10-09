using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface ISourceNewsService
    {
        Task<ApiSuccessResult<SourceNewsDto>>
        GetSourceNewsByPaging(
            SourceNewsRequest sourceNewsRequest
        );

        Task<SourceNews> GetSourceNews(int id);

        Task CreateSourceNews(SourceNews sourceNews);

        Task UpdateSourceNews(SourceNews sourceNews);

        Task DeleteSourceNews(int id);
    }
}
