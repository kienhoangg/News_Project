﻿using System.Linq.Expressions;
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

    public class DocumentService : RepositoryBase<Document, long, NewsContext>, IDocumentService
    {
        private readonly IMapper _mapper;
        private readonly IDocumentFieldService _documentFieldService;
        private readonly IDocumentTypeService _documentTypeService;
        private readonly IDocumentSignPersonService _documentSignPersonService;
        private readonly IDocumentDepartmentService _documentDepartmentService;
        public DocumentService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork, IDocumentFieldService documentFieldService, IDocumentTypeService documentTypeService, IDocumentSignPersonService documentSignPersonService, IDocumentDepartmentService documentDepartmentService) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _documentFieldService = documentFieldService;
            _documentTypeService = documentTypeService;
            _documentSignPersonService = documentSignPersonService;
            _documentDepartmentService = documentDepartmentService;
        }

        public async Task CreateDocument(Document document)
        {
            await CreateAsync(document);
        }

        public async Task<DocumentsMasterDataDto> GetMasterDataDocument()
        {
            var result = new DocumentsMasterDataDto()
            {
                DocumentDepartments = _mapper.Map<List<DocumentDepartmentDto>>(await _documentDepartmentService.GetAllDocumentDepartments()),
                DocumentFields = _mapper.Map<List<DocumentFieldDto>>(await _documentFieldService.GetAllDocumentFields()),
                DocumentTypes = _mapper.Map<List<DocumentTypeDto>>(await _documentTypeService.GetAllDocumentTypes()),
                DocumentSignPersons = _mapper.Map<List<DocumentSignPersonDto>>(await _documentSignPersonService.GetAllDocumentSignPersons()),
            };
            return result;
        }


        public async Task DeleteDocument(int id)
        {
            var document = await GetByIdAsync(id);
            await DeleteAsync(document);
        }

        public async Task<Document> GetDocument(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<DocumentDto>> GetDocumentByPaging(DocumentRequest documentRequest, params Expression<Func<Document, object>>[] includeProperties)
        {
            var query = FindAll();
            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(documentRequest.Keyword))
            {
                query = query.Where((x => x.Code.Contains(documentRequest.Keyword)));
            }
            PagedResult<Document>? sourcePaging = await query.PaginatedListAsync(documentRequest.CurrentPage
                                                                                             ?? 1, documentRequest.PageSize ?? CommonConstants.PAGE_SIZE, documentRequest.OrderBy, documentRequest.Direction);
            var lstDto = _mapper.Map<List<DocumentDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<DocumentDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<DocumentDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateDocument(Document product)
        {
            await UpdateAsync(product);
        }
    }
}