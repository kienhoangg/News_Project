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
    public class NewsPostService: RepositoryBase<NewsPost, long, NewsContext>, INewsPostService
    {
          private readonly IMapper _mapper;
        
        public NewsPostService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
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

        public async Task<NewsPost> GetNewsPost(long id)
        {
            var lstInclude = new Expression<Func<NewsPost, object>>[] { (x=>x.FieldNews),(x=>x.SourceNews),(x=>x.CategoryNews)};
            return await GetByIdAsync(id, lstInclude);
        }

        public async Task<ApiSuccessResult<NewsPostDto>> GetNewsPostByPaging(NewsPostRequest newsPostRequest)
        {
          
            var query = FindAll();

            if (!string.IsNullOrEmpty(newsPostRequest.Keyword))
            {
                query = FindByCondition((x => x.Title.Contains(newsPostRequest.Keyword)));
            }
            if(newsPostRequest.CategoryNewsId.HasValue)
            {
                query = query.Where(x => x.CategoryNewsId == newsPostRequest.CategoryNewsId);
            }

            if(newsPostRequest.FieldNewsId.HasValue)
            {
                query = query.Where(x => x.FieldNewsId == newsPostRequest.FieldNewsId);
            }
            if(newsPostRequest.CollaboratorId.HasValue)
            {
                query = query.Where(x => x.CollaboratorId == newsPostRequest.CollaboratorId);
            }

             if(newsPostRequest.FromDate.HasValue && newsPostRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.PublishedDate <= newsPostRequest.FromDate.Value &&
                 x.PublishedDate >= newsPostRequest.ToDate.Value);
            }
            IQueryable<NewsPostDto>? mappingQuery = query.ProjectTo<NewsPostDto>(_mapper.ConfigurationProvider);
            PagedResult<NewsPostDto>? paginationSet = await mappingQuery.PaginatedListAsync(newsPostRequest.CurrentPage
                                                                                             ?? 1, newsPostRequest.PageSize ?? CommonConstants.PAGE_SIZE,newsPostRequest.OrderBy, newsPostRequest.Direction);

            ApiSuccessResult<NewsPostDto>? result = new(paginationSet);
            return result; 
        }

        public async Task<int> UpdateNewsPost(NewsPost product)
        {
           return await UpdateAsync(product);
        }
    }
}