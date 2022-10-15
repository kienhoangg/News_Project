using System.Linq.Expressions;
using AutoMapper;
using Common.Enums;
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
    public class QuestionService : RepositoryBase<Question, int, NewsContext>, IQuestionService
    {
        private readonly IMapper _mapper;
        private readonly IQuestionCategoryService _questionCategoryService;
        public QuestionService(IMapper mapper, NewsContext dbContext,
            IUnitOfWork<NewsContext> unitOfWork, IQuestionCategoryService questionCategoryService) : base(dbContext, unitOfWork)
        {
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _questionCategoryService = questionCategoryService;
        }

        public async Task CreateQuestion(Question question)
        {
            await CreateAsync(question);
        }

        public async Task DeleteQuestion(int id)
        {
            var question = await GetByIdAsync(id);
            await DeleteAsync(question);
        }

        public async Task<Question> GetQuestion(int id)
        {
            return await GetByIdAsync(id);
        }

        public async Task<ApiSuccessResult<QuestionDto>> GetQuestionByPaging(QuestionRequest questionRequest, params Expression<Func<Question, object>>[] includeProperties)
        {
            var query = FindAll();

            if (includeProperties.ToList().Count > 0)
            {
                query = FindAll(includeProperties: includeProperties);
            }

            if (!string.IsNullOrEmpty(questionRequest.Keyword))
            {
                query = query.Where((x => x.Title.Contains(questionRequest.Keyword)));
            }
            if (questionRequest.QuestionStatus.HasValue)
            {
                query = query.Where((x => x.QuestionStatus == questionRequest.QuestionStatus.Value));
            }
            PagedResult<Question>? sourcePaging = await query.PaginatedListAsync(questionRequest.CurrentPage
                                                                                             ?? 1, questionRequest.PageSize ?? CommonConstants.PAGE_SIZE, questionRequest.OrderBy, questionRequest.Direction);
            var lstDto = _mapper.Map<List<QuestionDto>>(sourcePaging.Results);
            var paginationSet = new PagedResult<QuestionDto>(lstDto, sourcePaging.RowCount, sourcePaging.CurrentPage, sourcePaging.PageSize);
            ApiSuccessResult<QuestionDto>? result = new(paginationSet);
            return result;
        }

        public async Task UpdateQuestion(Question product)
        {
            await UpdateAsync(product);
        }

        public async Task<QuestionHomeDto> GetQuestionHome()
        {
            var questionHomeDto = new QuestionHomeDto()
            {
                NewQuestions = (await GetQuestionByPaging(new QuestionRequest()
                {
                    QuestionStatus = QuestionStatus.NEW_QUESTION,
                    PageSize = 5,
                    CurrentPage = 1
                })).PagedData.Results.ToList(),
                MostViewQuestions = (await GetQuestionByPaging(new QuestionRequest()
                {
                    OrderBy = "Views",
                    Direction = -1,
                    PageSize = 5,
                    CurrentPage = 1
                })).PagedData.Results.ToList(),
                QuestionCategories = await _questionCategoryService.GetAllQuestionCategories()
            };
            return questionHomeDto;
        }

    }
}