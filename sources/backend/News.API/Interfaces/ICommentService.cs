using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface ICommentService
    {
        Task<ApiSuccessResult<CommentDto>>
        GetCommentByPaging(
            CommentRequest collaboratorRequest
        );

        Task<Comment> GetComment(long id);

        Task CreateComment(Comment collaborator);

        Task UpdateComment(Comment collaborator);

        Task DeleteComment(long id);
    }
}
