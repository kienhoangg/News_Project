using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos.Documents;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IDocumentDepartmentService
    {
        Task<ApiSuccessResult<DocumentDepartmentDto>>
        GetDocumentDepartmentByPaging(

                DocumentDepartmentRequest documentDepartmentRequest,
                params Expression<Func<DocumentDepartment, object>>[] includeProperties

        );

        Task<DocumentDepartment> GetDocumentDepartment(int id);

        Task CreateDocumentDepartment(DocumentDepartment documentType);

        Task UpdateDocumentDepartment(DocumentDepartment documentType);

        Task DeleteDocumentDepartment(int id);
    }
}
