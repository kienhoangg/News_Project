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

    public class DocumentSignPersonService : RepositoryBase<DocumentSignPerson, int, NewsContext>, IDocumentSignPersonService
    {
        private readonly IMapper _mapper;
        public DocumentSignPersonService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateDocumentSignPerson(DocumentSignPerson documentSignPerson)
        {
            await CreateAsync(documentSignPerson);
        }

        public async Task DeleteDocumentSignPerson(int id)
        {
            var documentSignPerson = await GetByIdAsync(id);
            await DeleteAsync(documentSignPerson);
        }

        public async Task<DocumentSignPerson> GetDocumentSignPerson(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<List<DocumentSignPerson>> GetAllDocumentSignPersons()
        {
            return await FindAll().ToListAsync();
        }

        public async Task<ApiSuccessResult<DocumentSignPersonDto>> GetDocumentSignPersonByPaging(DocumentSignPersonRequest documentSignPersonRequest, params Expression<Func<DocumentSignPerson, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(documentSignPersonRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(documentSignPersonRequest.Keyword)));
            }
            PagedResult<DocumentSignPerson>? sourcePaging = await query.PaginatedListAsync(documentSignPersonRequest.CurrentPage
                                                                                             ?? 1, documentSignPersonRequest.PageSize ?? CommonConstants.PAGE_SIZE, documentSignPersonRequest.OrderBy, documentSignPersonRequest.Direction);
            var lstDto = _mapper.Map<List<DocumentSignPersonDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<DocumentSignPersonDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<DocumentSignPersonDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateDocumentSignPerson(DocumentSignPerson product)
        {
            await UpdateAsync(product);
        }
    }
}