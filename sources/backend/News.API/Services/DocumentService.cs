using System;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Interfaces;
using Infrastructure.Implements;
using Infrastructure.Mappings;
using Infrastructure.Shared.Paging;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Models.Constants;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Extensions;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class DocumentService : RepositoryBase<Document, long, NewsContext>, IDocumentService
    {
        private readonly IMapper _mapper;
        public DocumentService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public Task CreateDocument(Document product)
        {
            throw new NotImplementedException();
        }

        public Task DeleteDocument(long id)
        {
            throw new NotImplementedException();
        }

        public Task<Document> GetDocument(long id)
        {
            throw new NotImplementedException();
        }

        public async Task<ApiSuccessResult<DocumentDto>> GetDocumentsByPaging(DocumentRequest documentRequest, int currentPage)
        {
            int pageSize = CommonConstants.PAGE_SIZE;
            var query = FindAll();

            if (!string.IsNullOrEmpty(documentRequest.Keyword))
            {
                query = FindByCondition((x => x.Name.Contains(documentRequest.Keyword)));
            }
            var mappingQuery = query.ProjectTo<DocumentDto>(_mapper.ConfigurationProvider);
            var paginationSet = await mappingQuery.PaginatedListAsync(currentPage, pageSize);

            var result = new ApiSuccessResult<DocumentDto>(paginationSet);
            return result;
        }

        public Task UpdateDocument(Document product)
        {
            throw new NotImplementedException();
        }
    }
}

