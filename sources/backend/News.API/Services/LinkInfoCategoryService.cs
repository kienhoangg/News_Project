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
    public class LinkInfoCategoryService : RepositoryBase<LinkInfoCategory, int, NewsContext>, ILinkInfoCategoryService
    {
        private readonly IMapper _mapper;
        public LinkInfoCategoryService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateLinkInfoCategory(LinkInfoCategory linkInfoCategory)
        {
            await CreateAsync(linkInfoCategory);
        }

        public async Task DeleteLinkInfoCategory(int id)
        {
            var linkInfoCategory = await GetByIdAsync(id);
            await DeleteAsync(linkInfoCategory);
        }

        public async Task<LinkInfoCategory> GetLinkInfoCategory(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<LinkInfoCategoryDto>> GetLinkInfoCategoryByPaging(LinkInfoCategoryRequest linkInfoCategoryRequest, params Expression<Func<LinkInfoCategory, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(linkInfoCategoryRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(linkInfoCategoryRequest.Keyword)));
            }
            PagedResult<LinkInfoCategory>? sourcePaging = await query.PaginatedListAsync(linkInfoCategoryRequest.CurrentPage
                                                                                             ?? 1, linkInfoCategoryRequest.PageSize ?? CommonConstants.PAGE_SIZE, linkInfoCategoryRequest.OrderBy, linkInfoCategoryRequest.Direction);
            var lstDto = _mapper.Map<List<LinkInfoCategoryDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<LinkInfoCategoryDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<LinkInfoCategoryDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateLinkInfoCategory(LinkInfoCategory product)
        {
            await UpdateAsync(product);
        }
    }
}