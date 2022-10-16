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
    public class PhotoService : RepositoryBase<Photo, int, NewsContext>, IPhotoService
    {
        private readonly IMapper _mapper;
        public PhotoService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreatePhoto(Photo photo)
        {
            await CreateAsync(photo);
        }

        public async Task DeletePhoto(int id)
        {
            var photo = await GetByIdAsync(id);
            await DeleteAsync(photo);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<PhotoDto>> GetPhotoByPaging(PhotoRequest photoRequest, params Expression<Func<Photo, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(photoRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(photoRequest.Keyword)));
            }
            if (photoRequest.PhotoCategoryId.HasValue)
            {
                query = query.Where(x => x.PhotoCategoryId == photoRequest.PhotoCategoryId.Value);
            }
            PagedResult<Photo>? sourcePaging = await query.PaginatedListAsync(photoRequest.CurrentPage
                                                                                             ?? 1, photoRequest.PageSize ?? CommonConstants.PAGE_SIZE, photoRequest.OrderBy, photoRequest.Direction);
            var lstDto = _mapper.Map<List<PhotoDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<PhotoDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<PhotoDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdatePhoto(Photo product)
        {
            await UpdateAsync(product);
        }
    }
}