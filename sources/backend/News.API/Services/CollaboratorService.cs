using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Interfaces;
using Infrastructure.Implements;
using Infrastructure.Mappings;
using Infrastructure.Shared.Paging;
using Infrastructure.Shared.SeedWork;
using Models.Constants;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class CollaboratorService: RepositoryBase<Collaborator, int, NewsContext>, ICollaboratorService
    {
          private readonly IMapper _mapper;
        public CollaboratorService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task CreateCollaborator(Collaborator collaborator)
        {
            await CreateAsync(collaborator);
        }

        public async Task DeleteCollaborator(int id)
        {
           var collaborator = await GetByIdAsync(id);
            await DeleteAsync(collaborator);
        }

        public async Task<Collaborator> GetCollaborator(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<CollaboratorDto>> GetCollaboratorByPaging(CollaboratorRequest collaboratorRequest)
        {
            var query = FindAll();

            if (!string.IsNullOrEmpty(collaboratorRequest.Keyword))
            {
                query = FindByCondition((x => x.Name.Contains(collaboratorRequest.Keyword)));
            }
            IQueryable<CollaboratorDto>? mappingQuery = query.ProjectTo<CollaboratorDto>(_mapper.ConfigurationProvider);
            PagedResult<CollaboratorDto>? paginationSet = await mappingQuery.PaginatedListAsync(collaboratorRequest.CurrentPage
                                                                                             ?? 1, collaboratorRequest.PageSize ?? CommonConstants.PAGE_SIZE,collaboratorRequest.OrderBy, collaboratorRequest.Direction);

            ApiSuccessResult<CollaboratorDto>? result = new(paginationSet);
            return result; 
        }

        public async Task UpdateCollaborator(Collaborator product)
        {
            await UpdateAsync(product);
        }
    }
}