using System.Linq.Expressions;
using AutoMapper;
using Common.Interfaces;
using Infrastructure.Implements;
using Infrastructure.Mappings;
using Infrastructure.Shared.Paging;
using Infrastructure.Shared.SeedWork;
using Models.Constants;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class MenuService : RepositoryBase<Menu, int, NewsContext>, IMenuService
    {
        private readonly IMapper _mapper;
        public MenuService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateMenu(Menu menu)
        {
            await CreateAsync(menu);
        }

        public async Task DeleteMenu(int id)
        {
            var menu = await GetByIdAsync(id);
            await DeleteAsync(menu);
        }

        public async Task<Menu> GetMenu(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<List<HomeMenuDto>> GetHomeMenu()
        {
            var result = new List<HomeMenuDto>();
            var lstRootMenu = (await GetMenuByPaging(new MenuRequest()
            {
                ParentId = 0
            })).PagedData.Results.ToList();
            foreach (var item in lstRootMenu)
            {
                var lstChildMenu = (await GetMenuByPaging(new MenuRequest()
                {
                    ParentId = item.Id
                })).PagedData.Results.ToList();
                item.MenuChildren = lstChildMenu;
                var homeMenuDto = new HomeMenuDto()
                {
                    Id = item.Id,
                    Url = item.Url,
                    IsRootMenu = item.ParentId == 0 ? true : false,
                    Items = lstChildMenu
                };
                result.Add(homeMenuDto);
            }

            return result;
        }

        public async Task<ApiSuccessResult<MenuDto>> GetMenuByPaging(MenuRequest menuRequest, params Expression<Func<Menu, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(menuRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(menuRequest.Keyword)));
            }
            if (menuRequest.ParentId.HasValue)
            {
                query = query.Where((x => x.ParentId == menuRequest.ParentId.Value));
            }
            PagedResult<Menu>? sourcePaging = await query.PaginatedListAsync(menuRequest.CurrentPage ?? 0, menuRequest.PageSize ?? 0, menuRequest.OrderBy, menuRequest.Direction);
            var lstDto = _mapper.Map<List<MenuDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<MenuDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<MenuDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateMenu(Menu product)
        {
            await UpdateAsync(product);
        }
    }
}