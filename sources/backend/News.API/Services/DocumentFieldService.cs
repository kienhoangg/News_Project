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

    public class DocumentFieldService : RepositoryBase<DocumentField, int, NewsContext>, IDocumentFieldService
    {
        private readonly IMapper _mapper;
        public DocumentFieldService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateDocumentField(DocumentField documentField)
        {
            await CreateAsync(documentField);
        }

        public async Task DeleteDocumentField(int id)
        {
            var documentField = await GetByIdAsync(id);
            await DeleteAsync(documentField);
        }

        public async Task<DocumentField> GetDocumentField(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<DocumentFieldDto>> GetDocumentFieldByPaging(DocumentFieldRequest documentFieldRequest, params Expression<Func<DocumentField, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(documentFieldRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(documentFieldRequest.Keyword)));
            }
            PagedResult<DocumentField>? sourcePaging = await query.PaginatedListAsync(documentFieldRequest.CurrentPage
                                                                                             ?? 1, documentFieldRequest.PageSize ?? CommonConstants.PAGE_SIZE, documentFieldRequest.OrderBy, documentFieldRequest.Direction);
            var lstDto = _mapper.Map<List<DocumentFieldDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<DocumentFieldDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<DocumentFieldDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateDocumentField(DocumentField product)
        {
            await UpdateAsync(product);
        }
    }
}