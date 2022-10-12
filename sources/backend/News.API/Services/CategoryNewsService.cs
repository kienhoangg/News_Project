using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Interfaces;
using Infrastructure.Implements;
using Infrastructure.Mappings;
using Infrastructure.Shared.Paging;
using Infrastructure.Shared.SeedWork;
using Microsoft.EntityFrameworkCore;
using Models.Constants;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class CategoryNewsService : RepositoryBase<CategoryNews, int, NewsContext>, ICategoryNewsService
    {
        private readonly IMapper _mapper;
        public CategoryNewsService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateCategoryNews(CategoryNews categoryNews)
        {
            await CreateAsync(categoryNews);
        }

        public async Task DeleteCategoryNews(int id)
        {
            var categoryNews = await GetByIdAsync(id);
            await DeleteAsync(categoryNews);
        }

        public async Task<CategoryNews> GetCategoryNews(int id)
        {
            return await GetByIdAsync(id, x => x.FieldNews);
        }

        public async Task<CategoryNews> GetCategoryNewsByCondition(Expression<Func<CategoryNews, bool>> expression)
        {
            return await FindByCondition(expression, includeProperties: x => x.FieldNews).FirstOrDefaultAsync();
        }

        public async Task<ApiSuccessResult<CategoryNewsDto>> GetCategoryNewsByPaging(CategoryNewsRequest categoryNewsRequest)
        {
            var query = FindAll();

            if (!string.IsNullOrEmpty(categoryNewsRequest.Keyword))
            {
                query = FindByCondition((x => x.CategoryNewsName.Contains(categoryNewsRequest.Keyword)));
            }
            IQueryable<CategoryNewsDto>? mappingQuery = query.ProjectTo<CategoryNewsDto>(_mapper.ConfigurationProvider);
            PagedResult<CategoryNewsDto>? paginationSet = await mappingQuery.PaginatedListAsync(categoryNewsRequest.CurrentPage
                                                                                             ?? 1, categoryNewsRequest.PageSize ?? CommonConstants.PAGE_SIZE, categoryNewsRequest.OrderBy, categoryNewsRequest.Direction);

            ApiSuccessResult<CategoryNewsDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateCategoryNews(CategoryNews product)
        {
            await UpdateAsync(product);
        }
    }
}