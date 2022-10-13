using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IStaticCategoryService
    {
        Task<ApiSuccessResult<StaticCategoryDto>>
        GetStaticCategoryByPaging(

                StaticCategoryRequest staticCategoryRequest,
                params Expression<Func<StaticCategory, object>>[] includeProperties

        );

        Task<StaticCategory> GetStaticCategory(int id);

        Task CreateStaticCategory(StaticCategory staticCategory);

        Task UpdateStaticCategory(StaticCategory staticCategory);

        Task DeleteStaticCategory(int id);
    }
}
