using System.Linq.Expressions;
using Infrastructure.Shared.SeedWork;
using Models.Dtos;
using Models.Entities;
using Models.Requests;

namespace News.API.Interfaces
{
    public interface IStaticInfoService
    {
        Task<ApiSuccessResult<StaticInfoDto>>
        GetStaticInfoByPaging(

                StaticInfoRequest staticRequest,
                params Expression<Func<StaticInfo, object>>[] includeProperties

        );

        Task<StaticInfo> GetStaticInfo(int id);

        Task CreateStaticInfo(StaticInfo staticInfo);

        Task<int> UpdateStaticInfo(StaticInfo staticInfo);

        Task DeleteStaticInfo(int id);
    }
}
