using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IPhotoCategoryService
    {
        Task<ApiSuccessResult<PhotoCategoryDto>>
        GetPhotoCategoryByPaging(

                PhotoCategoryRequest photoCategoryRequest,
                params Expression<Func<PhotoCategory, object>>[] includeProperties

        );
        Task<PhotoCategory> GetPhotoCategory(int id, params Expression<Func<PhotoCategory, object>>[] includeProperties);

        Task CreatePhotoCategory(PhotoCategory photoCategory);

        Task UpdatePhotoCategory(PhotoCategory photoCategory);

        Task DeletePhotoCategory(int id);
    }
}
