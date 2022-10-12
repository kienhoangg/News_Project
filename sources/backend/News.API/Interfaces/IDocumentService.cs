using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IDocumentService
    {
        Task<ApiSuccessResult<DocumentDto>>
        GetDocumentByPaging(

                DocumentRequest documentFieldRequest,
                params Expression<Func<Document, object>>[] includeProperties

        );

        Task<Document> GetDocument(int id);

        Task CreateDocument(Document documentField);

        Task UpdateDocument(Document documentField);

        Task DeleteDocument(int id);
    }
}
