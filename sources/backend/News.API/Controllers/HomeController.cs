using AutoMapper;
using Common.Interfaces;
using Common.Shared.Constants;
using Common.Shared.DTOs.Identity;
using Contracts.Interfaces;
using Infrastructure.Identity.Authorization;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Dtos.Home;
using Models.Entities;
using Models.Requests;
using News.API.Authorization;
using News.API.Interfaces;

namespace News.API.Controllers
{

    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly INewsPostService _newsPostService;
        private IJwtUtils _jwtUtils;
        private readonly ICategoryNewsService _categoryNewsService;
        private readonly IDocumentService _documentService;
        private readonly IQuestionService _questionService;

        private readonly ISerializeService _serializeService;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;

        public HomeController(
            INewsPostService newsPostService,
            ISerializeService serializeService,
            IMapper mapper,
            ICategoryNewsService categoryNewsService
,
            IDocumentService documentService,
            IQuestionService questionService,
            ITokenService tokenService,
            IJwtUtils jwtUtils)
        {
            _newsPostService = newsPostService;
            _serializeService = serializeService;
            _mapper = mapper;
            _categoryNewsService = categoryNewsService;
            _documentService = documentService;
            _questionService = questionService;
            _tokenService = tokenService;
            _jwtUtils = jwtUtils;
        }

        [HttpGet("documents/master")]
        public async Task<IActionResult> GetMasterDataDocument()
        {
            var result = await _documentService.GetMasterDataDocument();
            return Ok(result);
        }

        [HttpGet("question")]
        public async Task<IActionResult> GetQuestionAnswer()
        {
            var result = await _questionService.GetQuestionHome();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var jwtToken = _jwtUtils.GenerateJwtToken(RoleCode.PUBLIC.ToString());
            // Get 5 hot news
            var hotNewsRequets =
                new NewsPostRequest()
                { PageSize = 10, CurrentPage = 1, OrderBy = "Order", IsHotNews = true };

            var lstHotNews =
                await _newsPostService.GetNewsPostByPaging(hotNewsRequets);
            var categoryNewsId = 5;
            var normalNews =
                new NewsPostRequest()
                {
                    PageSize = 5,
                    CurrentPage = 1,
                    OrderBy = "Order",
                    CategoryNewsId = categoryNewsId
                };

            var lstNormalNews =
                await _newsPostService.GetNewsPostByPaging(normalNews);
            var lstDocuments =
                           (await _documentService.GetDocumentByPaging(new DocumentRequest()
                           {
                               PageSize = 15,
                               CurrentPage = 1,
                               OrderBy = "Order",
                               Direction = -1
                           })).PagedData.Results.ToList();
            if (
                lstHotNews.PagedData.Results.Count <= 0 &&
                lstNormalNews.PagedData.Results.Count <= 0 && lstDocuments.Count <= 0
            )
            {
                return NotFound(new ApiErrorResult<NewsPost
                >("Not found any news"));
            }
            int index = lstDocuments.Count / 2 + 1;
            var result =
                new ApiSuccessResult<HomeDto>(new HomeDto()
                {
                    NewsHots = lstHotNews.PagedData.Results.ToList(),
                    NewsSectionDto =
                            new NewsSectionDto()
                            {
                                CategoryNews =
                                    _mapper
                                        .Map
                                        <CategoryNewsDto
                                        >(await _categoryNewsService
                                            .GetCategoryNews(categoryNewsId)),
                                Data = lstNormalNews.PagedData.Results.ToList()
                            },
                    DocumentHots = lstDocuments.GetRange(0, index),
                    DocumentSectionDto = lstDocuments.GetRange(index, lstDocuments.Count - index)
                });

            // Get CategoryNews with 5 normal news
            return Ok(result);
        }
    }
}
