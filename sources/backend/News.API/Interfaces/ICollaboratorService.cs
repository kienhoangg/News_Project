using Common.Enums;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface ICollaboratorService
    {
        Task<ApiSuccessResult<CollaboratorDto>>
        GetCollaboratorByPaging(
            CollaboratorRequest collaboratorRequest
        );

        Task<Collaborator> GetCollaborator(int id);

        Task CreateCollaborator(Collaborator collaborator);

        Task UpdateCollaborator(Collaborator collaborator);

        Task DeleteCollaborator(int id);
        Task UpdateManyCollaboratorDto(List<int> lstCollaboratorId, bool value, MultipleTypeUpdate multipleTypeUpdate);
    }
}
