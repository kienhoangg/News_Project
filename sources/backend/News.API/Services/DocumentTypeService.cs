using System.Linq.Expressions;
using AutoMapper;
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

    public class DocumentTypeService : RepositoryBase<DocumentType, int, NewsContext>, IDocumentTypeService
    {
        private readonly IMapper _mapper;
        public DocumentTypeService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateDocumentType(DocumentType documentField)
        {
            await CreateAsync(documentField);
        }

        public async Task DeleteDocumentType(int id)
        {
            var documentField = await GetByIdAsync(id);
            await DeleteAsync(documentField);
        }

        public async Task<DocumentType> GetDocumentType(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<List<DocumentType>> GetAllDocumentTypes()
        {
            return await FindAll().ToListAsync();
        }

        public async Task<ApiSuccessResult<DocumentTypeDto>> GetDocumentTypeByPaging(DocumentTypeRequest documentFieldRequest, params Expression<Func<DocumentType, object>>[] includeProperties)
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
            PagedResult<DocumentType>? sourcePaging = await query.PaginatedListAsync(documentFieldRequest.CurrentPage
                                                                                             ?? 1, documentFieldRequest.PageSize ?? CommonConstants.PAGE_SIZE, documentFieldRequest.OrderBy, documentFieldRequest.Direction);
            var lstDto = _mapper.Map<List<DocumentTypeDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<DocumentTypeDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<DocumentTypeDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateDocumentType(DocumentType product)
        {
            await UpdateAsync(product);
        }
    }
}