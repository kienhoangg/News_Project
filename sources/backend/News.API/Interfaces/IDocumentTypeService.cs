using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IDocumentTypeService
    {
        Task<ApiSuccessResult<DocumentTypeDto>>
        GetDocumentTypeByPaging(

                DocumentTypeRequest documentFieldRequest,
                params Expression<Func<DocumentType, object>>[] includeProperties

        );

        Task<DocumentType> GetDocumentType(int id);

        Task CreateDocumentType(DocumentType documentType);

        Task UpdateDocumentType(DocumentType documentType);

        Task DeleteDocumentType(int id);

        Task<List<DocumentType>> GetAllDocumentTypes();
    }
}
