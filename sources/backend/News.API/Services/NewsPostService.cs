using System.Linq.Expressions;
using AutoMapper;
using Common.Interfaces;
using Infrastructure.Implements;
using Infrastructure.Mappings;
using Infrastructure.Shared.Paging;
using Infrastructure.Shared.SeedWork;
using Models.Constants;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class NewsPostService : RepositoryBase<NewsPost, long, NewsContext>, INewsPostService
    {
        private readonly IMapper _mapper;
        private readonly IFieldNewsService _fieldNewsService;
        private readonly ICategoryNewsService _categoryNewsService;

        public NewsPostService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork, IFieldNewsService fieldNewsService = null, ICategoryNewsService categoryNewsService = null) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _fieldNewsService = fieldNewsService;
            _categoryNewsService = categoryNewsService;
        }

        public async Task CreateNewsPost(NewsPost newsPost)
        {
            await CreateAsync(newsPost);
        }

        public async Task<int> DeleteNewsPost(long id)
        {
            var newsPost = await GetByIdAsync(id);
            return await DeleteAsync(newsPost);
        }

        public async Task<NewsPostCategoryEachFieldsDto> GetNewsPostCategoryEachFields(int fieldNewsid, NewsPostRequest newsPostRequest)
        {
            newsPostRequest.FieldNewsId = fieldNewsid;
            var categoryNews = await _categoryNewsService.GetCategoryNewsByCondition(x => x.FieldNews_SK_FK == fieldNewsid);
            var pagedNewsPost = await GetNewsPostByPagingWithoutContent(newsPostRequest);
            var newsPostCategoryEachFieldsDto = new NewsPostCategoryEachFieldsDto()
            {
                CategoryNews = _mapper.Map<CategoryNewsDto>(categoryNews),
                NewsPosts = pagedNewsPost.PagedData
            };
            return newsPostCategoryEachFieldsDto;
        }

        public async Task<NewsPost> GetNewsPost(long id, params Expression<Func<NewsPost, object>>[] includeProperties)
        {
            var lstInclude = new Expression<Func<NewsPost, object>>[] { (x => x.FieldNews), (x => x.SourceNews), (x => x.CategoryNews) };
            return await GetByIdAsync(id, includeProperties);
        }

        public async Task<ApiSuccessResult<NewsPostDto>> GetNewsPostByPaging(NewsPostRequest newsPostRequest, params Expression<Func<NewsPost, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }
            if (!string.IsNullOrEmpty(newsPostRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(newsPostRequest.Keyword)));
            }
            if (newsPostRequest.CategoryNewsId.HasValue)
            {
                query = query.Where(x => x.CategoryNewsId == newsPostRequest.CategoryNewsId);
            }

            if (newsPostRequest.CategoryNewsId.HasValue)
            {
                query = query.Where(x => x.CategoryNewsId == newsPostRequest.CategoryNewsId);
            }

            if (newsPostRequest.FieldNewsId.HasValue)
            {
                query = query.Where(x => x.FieldNewsId == newsPostRequest.FieldNewsId);
            }
            if (newsPostRequest.CollaboratorId.HasValue)
            {
                query = query.Where(x => x.CollaboratorId == newsPostRequest.CollaboratorId);
            }
            if (newsPostRequest.IsHotNews.HasValue)
            {
                if (newsPostRequest.IsHotNews.Value)
                {
                    query = query.Where(x => x.IsHotNews);
                }
                else
                {
                    query = query.Where(x => !x.IsHotNews);
                }
            }
            if (newsPostRequest.FromDate.HasValue && newsPostRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.PublishedDate <= newsPostRequest.FromDate.Value &&
                 x.PublishedDate >= newsPostRequest.ToDate.Value);
            }
            if (newsPostRequest.TodayDate.HasValue)
            {
                var today = newsPostRequest.TodayDate.Value;
                var tomorrow = today.AddDays(1);
                query = query.Where(x => x.PublishedDate <= tomorrow &&
                 x.PublishedDate >= today);
            }
            if (newsPostRequest.ListNewsPostId.Count > 0)
            {
                query = query.Where(x => newsPostRequest.ListNewsPostId.Contains(x.Id));
            }
            PagedResult<NewsPost>? sourcePaging = await query.PaginatedListAsync(newsPostRequest.CurrentPage
                                                                                              ?? 0, newsPostRequest.PageSize ?? 0, newsPostRequest.OrderBy, newsPostRequest.Direction);
            var lstDto = _mapper.Map<List<NewsPostDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<NewsPostDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<NewsPostDto>? result = new(paginationSet);
            return result;
        }

        public async Task<ApiSuccessResult<NewsPostWithoutContentDto>> GetNewsPostByPagingWithoutContent(NewsPostRequest newsPostRequest, params Expression<Func<NewsPost, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }
            if (!string.IsNullOrEmpty(newsPostRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(newsPostRequest.Keyword)));
            }
            if (newsPostRequest.CategoryNewsId.HasValue)
            {
                query = query.Where(x => x.CategoryNewsId == newsPostRequest.CategoryNewsId);
            }
            if (newsPostRequest.CategoryNewsId.HasValue)
            {
                query = query.Where(x => x.CategoryNewsId == newsPostRequest.CategoryNewsId);
            }

            if (newsPostRequest.FieldNewsId.HasValue)
            {
                query = query.Where(x => x.FieldNewsId == newsPostRequest.FieldNewsId);
            }
            if (newsPostRequest.CollaboratorId.HasValue)
            {
                query = query.Where(x => x.CollaboratorId == newsPostRequest.CollaboratorId);
            }
            if (newsPostRequest.IsHotNews.HasValue)
            {
                if (newsPostRequest.IsHotNews.Value)
                {
                    query = query.Where(x => x.IsHotNews);
                }
                else
                {
                    query = query.Where(x => !x.IsHotNews);
                }
            }
            if (newsPostRequest.FromDate.HasValue && newsPostRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.PublishedDate <= newsPostRequest.FromDate.Value &&
                 x.PublishedDate >= newsPostRequest.ToDate.Value);
            }

            if (newsPostRequest.ListNewsPostId.Count > 0)
            {
                query = query.Where(x => newsPostRequest.ListNewsPostId.Contains(x.Id));
            }
            PagedResult<NewsPost>? sourcePaging = await query.PaginatedListAsync(newsPostRequest.CurrentPage
                                                                                              ?? 1, newsPostRequest.PageSize ?? CommonConstants.PAGE_SIZE, newsPostRequest.OrderBy, newsPostRequest.Direction);
            var lstDto = _mapper.Map<List<NewsPostWithoutContentDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<NewsPostWithoutContentDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<NewsPostWithoutContentDto>? result = new(paginationSet);
            return result;
        }

        public async Task<int> UpdateNewsPost(NewsPost product)
        {
            return await UpdateAsync(product);
        }

        public async Task UpdateManyNewsPostDto(List<long> lstNewsPostId)
        {
            var lstNewsPostDto = (await GetNewsPostByPaging(new NewsPostRequest()
            {
                ListNewsPostId = lstNewsPostId
            })).PagedData.Results.ToList();
            lstNewsPostDto.ForEach(x => x.IsHotNews = true);
            await UpdateListAsync(_mapper.Map<List<NewsPost>>(lstNewsPostDto));
        }
    }
}