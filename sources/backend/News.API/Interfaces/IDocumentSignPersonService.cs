using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IDocumentSignPersonService
    {
        Task<ApiSuccessResult<DocumentSignPersonDto>>
        GetDocumentSignPersonByPaging(

                DocumentSignPersonRequest documentSignPersonRequest,
                params Expression<Func<DocumentSignPerson, object>>[] includeProperties

        );

        Task<DocumentSignPerson> GetDocumentSignPerson(int id);

        Task CreateDocumentSignPerson(DocumentSignPerson documentSignPerson);

        Task UpdateDocumentSignPerson(DocumentSignPerson documentSignPerson);

        Task DeleteDocumentSignPerson(int id);
    }
}