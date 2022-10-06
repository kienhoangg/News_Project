using System.Linq.Expressions;
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
    public class FieldNewsService: RepositoryBase<FieldNews, int, NewsContext>, IFieldNewsService
    {
          private readonly IMapper _mapper;
        public FieldNewsService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateFieldNews(FieldNews fieldNews)
        {
            await CreateAsync(fieldNews);
        }

        public async Task DeleteFieldNews(int id)
        {
           var fieldNews = await GetByIdAsync(id);
            await DeleteAsync(fieldNews);
        }

        public async Task<FieldNews> GetFieldNews(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<FieldNewsDto>> GetFieldNewsByPaging(FieldNewsRequest fieldNewsRequest, params Expression<Func<FieldNews, object>>[] includeProperties)
        {
             var query = FindAll();
            if(includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(fieldNewsRequest.Keyword))
            {
                query = FindByCondition((x => x.Title.Contains(fieldNewsRequest.Keyword)));
            }
            PagedResult<FieldNews>? sourcePaging= await query.PaginatedListAsync(fieldNewsRequest.CurrentPage
                                                                                             ?? 1, fieldNewsRequest.PageSize ?? CommonConstants.PAGE_SIZE, fieldNewsRequest.OrderBy, fieldNewsRequest.Direction);
            var lstDto =  _mapper.Map<List<FieldNewsDto>>(sourcePaging.Results);
           var paginationSet = new PagedResult<FieldNewsDto>(lstDto,sourcePaging.RowCount,sourcePaging.CurrentPage,sourcePaging.PageSize);
            ApiSuccessResult<FieldNewsDto>? result = new(paginationSet);
            return result; 
        }

        public async Task UpdateFieldNews(FieldNews product)
        {
            await UpdateAsync(product);
        }
    }
}