using System.Linq.Expressions;
using AutoMapper;
using Common.Enums;
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

        public async Task<CategoryNews> GetCategoryNewsByCondition(Expression<Func<CategoryNews, bool>> expression)
        {
            return await FindByCondition(expression, includeProperties: x => x.NewsPosts).FirstOrDefaultAsync();
        }

        public async Task DeleteCategoryNews(int id)
        {
            var categoryNews = await GetByIdAsync(id);
            await DeleteAsync(categoryNews);
        }

        public IQueryable<Comment> GetCommentByCategoryNews(CommentRequest commentRequest)
        {

            var query = FindByCondition((x => x.Id == commentRequest.CategoryNewsId)).SelectMany(x => x.NewsPosts)
               .SelectMany(x => x.Comments);
            if (!string.IsNullOrEmpty(commentRequest.Keyword))
            {
                query = query.Where(x => x.Username.Contains(commentRequest.Keyword));
            }
            return query;
        }


        public async Task<CategoryNews> GetCategoryNews(int id, params Expression<Func<CategoryNews, object>>[] includeProperties)
        {
            return await GetByIdAsync(id, includeProperties);
        }

        public async Task<CategoryNewsDto> GetCategoryNewsWithParentName(int id, params Expression<Func<CategoryNews, object>>[] includeProperties)
        {
            var categoryNewsDto = _mapper.Map<CategoryNewsDto>(await GetCategoryNews(id, includeProperties));
            if (categoryNewsDto.ParentId.HasValue && categoryNewsDto.ParentId != 0)
            {
                categoryNewsDto.ParentName = (await GetCategoryNews(categoryNewsDto.ParentId.Value)).CategoryNewsName;
            }
            return categoryNewsDto;
        }

        public async Task<ApiSuccessResult<CategoryNewsDto>> GetCategoryNewsByPaging(CategoryNewsRequest categoryNewsRequest, params Expression<Func<CategoryNews, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(categoryNewsRequest.Keyword))
            {
                query = query.Where((x => x.CategoryNewsName.Contains(categoryNewsRequest.Keyword)));
            }
            if (categoryNewsRequest.Status.HasValue)
            {
                query = query.Where(x => x.Status == categoryNewsRequest.Status.Value);
            }
            PagedResult<CategoryNews>? sourcePaging = await query.PaginatedListAsync(categoryNewsRequest.CurrentPage
                                                                                             ?? 1, categoryNewsRequest.PageSize ?? CommonConstants.PAGE_SIZE, categoryNewsRequest.OrderBy, categoryNewsRequest.Direction);
            var lstDto = _mapper.Map<List<CategoryNewsDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<CategoryNewsDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<CategoryNewsDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateCategoryNews(CategoryNews product)
        {
            await UpdateAsync(product);
        }

        public async Task<ApiSuccessResult<CategoryNews>> GetCategoryNewsNormalByPaging(CategoryNewsRequest categoryNewsRequest, params Expression<Func<CategoryNews, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (categoryNewsRequest.Ids != null && categoryNewsRequest.Ids.Count > 0)
            {
                query = query.Where(x => categoryNewsRequest.Ids.Contains(x.Id));
            }

            PagedResult<CategoryNews>? sourcePaging = await query.PaginatedListAsync(categoryNewsRequest.CurrentPage
                                                                                              ?? 0, categoryNewsRequest.PageSize ?? 0, categoryNewsRequest.OrderBy, categoryNewsRequest.Direction);
            ApiSuccessResult<CategoryNews>? result = new(sourcePaging);
            return result;
        }

        public async Task UpdateManyCategoryNewsDto(List<int> lstCategoryNewsId, bool value, MultipleTypeUpdate multipleTypeUpdate)
        {
            var lstCategoryNewsDto = (await GetCategoryNewsNormalByPaging(new CategoryNewsRequest()
            {
                Ids = lstCategoryNewsId
            })).PagedData.Results.ToList();
            Action<CategoryNews> action = null;
            switch (multipleTypeUpdate)
            {
                case MultipleTypeUpdate.STATUS:
                    action = new Action<CategoryNews>(x => x.Status = value ? Status.Enabled : Status.Disabled);
                    break;
                default:
                    break;
            }
            if (action != null)
            {
                lstCategoryNewsDto.ForEach(action);
                await UpdateListAsync(lstCategoryNewsDto);
            }
        }
    }
}