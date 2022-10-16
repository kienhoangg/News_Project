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
    public class PhotoCategoryService : RepositoryBase<PhotoCategory, int, NewsContext>, IPhotoCategoryService
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public PhotoCategoryService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork, IPhotoService photoService) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _photoService = photoService;
        }

        public async Task CreatePhotoCategory(PhotoCategory photoCategory)
        {
            await CreateAsync(photoCategory);
        }

        public async Task DeletePhotoCategory(int id)
        {
            var photoCategory = await GetByIdAsync(id);
            await DeleteAsync(photoCategory);
        }

        public async Task<PhotoCategory> GetPhotoCategory(int id, params Expression<Func<PhotoCategory, object>>[] includeProperties)
        {
            return await GetByIdAsync(id, includeProperties);
        }

        public async Task<ApiSuccessResult<PhotoCategoryDto>> GetPhotoCategoryByPaging(PhotoCategoryRequest photoCategoryRequest, params Expression<Func<PhotoCategory, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(photoCategoryRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(photoCategoryRequest.Keyword)));
            }
            PagedResult<PhotoCategory>? sourcePaging = await query.PaginatedListAsync(photoCategoryRequest.CurrentPage
                                                                                             ?? 1, photoCategoryRequest.PageSize ?? CommonConstants.PAGE_SIZE, photoCategoryRequest.OrderBy, photoCategoryRequest.Direction);
            var lstDto = _mapper.Map<List<PhotoCategoryDto>>(sourcePaging.Results);
            foreach (var item in lstDto)
            {
                var photo = (await _photoService.GetPhotoByPaging(new PhotoRequest()
                {
                    CurrentPage = 1,
                    PageSize = 1,
                    PhotoCategoryId = item.Id
                })).PagedData.Results.ToList().FirstOrDefault();
                if (photo != null && !String.IsNullOrEmpty(photo.ImagePath))
                {
                    if (photo.ImagePath.Contains(";;"))
                    {
                        item.Avatar = photo.ImagePath.Split(";;")[0];
                    }
                    else
                    {
                        item.Avatar = photo.ImagePath;
                    }
                }
            }
            var paginationSet = new PagedResult<PhotoCategoryDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<PhotoCategoryDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdatePhotoCategory(PhotoCategory product)
        {
            await UpdateAsync(product);
        }
    }
}