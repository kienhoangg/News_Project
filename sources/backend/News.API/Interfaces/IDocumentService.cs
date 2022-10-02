using System;
using Common.Interfaces;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Persistence;

namespace News.API.Interfaces
{
    public interface IDocumentService : IRepositoryBase<Document, long, NewsContext>
    {
        Task<ApiSuccessResult<DocumentDto>> GetDocumentsByPaging(
            DocumentRequest documentRequest, int currentPage);
        Task<Document> GetDocument(long id);
        Task CreateDocument(Document product);
        Task UpdateDocument(Document product);
        Task DeleteDocument(long id);
    }
}

