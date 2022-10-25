using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface ILinkInfoCategoryService
    {
        Task<ApiSuccessResult<LinkInfoCategoryDto>>
        GetLinkInfoCategoryByPaging(

                LinkInfoCategoryRequest linkInfoCategoryRequest,
                params Expression<Func<LinkInfoCategory, object>>[] includeProperties

        );

        Task<LinkInfoCategory> GetLinkInfoCategory(int id);

        Task CreateLinkInfoCategory(LinkInfoCategory linkInfoCategory);

        Task UpdateLinkInfoCategory(LinkInfoCategory linkInfoCategory);

        Task DeleteLinkInfoCategory(int id);
    }
}
