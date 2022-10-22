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
    public class CommentService : RepositoryBase<Comment, long, NewsContext>, ICommentService
    {
        private readonly IMapper _mapper;
        public CommentService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateComment(Comment comment)
        {
            await CreateAsync(comment);
        }

        public async Task DeleteComment(long id)
        {
            var comment = await GetByIdAsync(id);
            await DeleteAsync(comment);
        }

        public async Task<Comment> GetComment(long id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<CommentDto>> GetCommentByPaging(CommentRequest commentRequest, params Expression<Func<Comment, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(commentRequest.Keyword))
            {
                query = query.Where((x => x.Content.Contains(commentRequest.Keyword)));
            }
            PagedResult<Comment>? sourcePaging = await query.PaginatedListAsync(commentRequest.CurrentPage
                                                                                             ?? 1, commentRequest.PageSize ?? CommonConstants.PAGE_SIZE, commentRequest.OrderBy, commentRequest.Direction);
            var lstDto = _mapper.Map<List<CommentDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<CommentDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<CommentDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateComment(Comment product)
        {
            await UpdateAsync(product);
        }
    }
}