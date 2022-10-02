using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Interfaces;
using Infrastructure.Implements;
using Infrastructure.Mappings;
using Infrastructure.Shared.Paging;
using Infrastructure.Shared.SeedWork;
using Models.Constants;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class SourceNewsService: RepositoryBase<SourceNews, int, NewsContext>, ISourceNewsService
    {
          private readonly IMapper _mapper;
        public SourceNewsService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateSourceNews(SourceNews sourceNews)
        {
            await CreateAsync(sourceNews);
        }

        public async Task DeleteSourceNews(int id)
        {
           var sourceNews = await GetByIdAsync(id);
            await DeleteAsync(sourceNews);
        }

        public async Task<SourceNews> GetSourceNews(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<SourceNewsDto>> GetSourceNewsByPaging(SourceNewsRequest sourceNewsRequest)
        {
            var query = FindAll();

            if (!string.IsNullOrEmpty(sourceNewsRequest.Keyword))
            {
                query = FindByCondition((x => x.Title.Contains(sourceNewsRequest.Keyword)));
            }
            IQueryable<SourceNewsDto>? mappingQuery = query.ProjectTo<SourceNewsDto>(_mapper.ConfigurationProvider);
            PagedResult<SourceNewsDto>? paginationSet = await mappingQuery.PaginatedListAsync(sourceNewsRequest.CurrentPage
                                                                                             ?? 1, sourceNewsRequest.PageSize ?? CommonConstants.PAGE_SIZE,sourceNewsRequest.OrderBy, sourceNewsRequest.Direction);

            ApiSuccessResult<SourceNewsDto>? result = new(paginationSet);
            return result; 
        }

        public async Task UpdateSourceNews(SourceNews product)
        {
            await UpdateAsync(product);
        }
    }
}