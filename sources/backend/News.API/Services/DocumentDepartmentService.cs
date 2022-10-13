using System.Linq;
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

    public class DocumentDepartmentService : RepositoryBase<DocumentDepartment, int, NewsContext>, IDocumentDepartmentService
    {
        private readonly IMapper _mapper;
        public DocumentDepartmentService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateDocumentDepartment(DocumentDepartment documentDepartment)
        {
            await CreateAsync(documentDepartment);
        }

        public async Task DeleteDocumentDepartment(int id)
        {
            var documentDepartment = await GetByIdAsync(id);
            await DeleteAsync(documentDepartment);
        }

        public async Task<DocumentDepartment> GetDocumentDepartment(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<List<DocumentDepartment>> GetAllDocumentDepartments()
        {
            return await FindAll().ToListAsync();
        }

        public async Task<ApiSuccessResult<DocumentDepartmentDto>> GetDocumentDepartmentByPaging(DocumentDepartmentRequest documentDepartmentRequest, params Expression<Func<DocumentDepartment, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(documentDepartmentRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(documentDepartmentRequest.Keyword)));
            }
            PagedResult<DocumentDepartment>? sourcePaging = await query.PaginatedListAsync(documentDepartmentRequest.CurrentPage
                                                                                             ?? 1, documentDepartmentRequest.PageSize ?? CommonConstants.PAGE_SIZE, documentDepartmentRequest.OrderBy, documentDepartmentRequest.Direction);
            var lstDto = _mapper.Map<List<DocumentDepartmentDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<DocumentDepartmentDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<DocumentDepartmentDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateDocumentDepartment(DocumentDepartment product)
        {
            await UpdateAsync(product);
        }
    }
}