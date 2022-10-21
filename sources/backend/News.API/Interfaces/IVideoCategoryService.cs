using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IVideoCategoryService
    {
        Task<ApiSuccessResult<VideoCategoryDto>>
        GetVideoCategoryByPaging(

                VideoCategoryRequest videoCategoryRequest,
                params Expression<Func<VideoCategory, object>>[] includeProperties

        );

        Task<VideoCategory> GetVideoCategory(int id);

        Task CreateVideoCategory(VideoCategory videoCategory);

        Task UpdateVideoCategory(VideoCategory videoCategory);

        Task DeleteVideoCategory(int id);
    }
}
