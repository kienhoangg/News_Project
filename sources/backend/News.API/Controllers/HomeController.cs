using AutoMapper;
using Common.Interfaces;
using Common.Shared.Constants;
using Contracts.Interfaces;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Constants;
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
        private readonly AccessCounter _counter = AccessCounter.GetInstance();
        private readonly INewsPostService _newsPostService;
        private IJwtUtils _jwtUtils;
        private readonly ICategoryNewsService _categoryNewsService;
        private readonly IDocumentService _documentService;
        private readonly IQuestionService _questionService;
        private readonly IMenuService _menuService;
        private readonly IPhotoService _photoService;

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
            IJwtUtils jwtUtils,
            IMenuService menuService,
            IPhotoService photoService)
        {
            _newsPostService = newsPostService;
            _serializeService = serializeService;
            _mapper = mapper;
            _categoryNewsService = categoryNewsService;
            _documentService = documentService;
            _questionService = questionService;
            _tokenService = tokenService;
            _jwtUtils = jwtUtils;
            _menuService = menuService;
            _photoService = photoService;
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

        [HttpGet("menu")]
        public async Task<IActionResult> GetHomeMenu()
        {
            var result = await _menuService.GetHomeMenu();
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            _counter.Increase();
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
            var lstImages = (await _photoService.GetPhotoByPaging(new PhotoRequest()
            {
                CurrentPage = 1,
                PageSize = 15,
                OrderBy = "Order",
                Direction = 1
            }, x => x.PhotoCategory)).PagedData.Results.ToList();
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
                    DocumentSectionDto = lstDocuments.GetRange(index, lstDocuments.Count - index),
                    Images = lstImages,
                    AccessCounter = _counter.GetValue()
                });


            return Ok(result);
        }
    }
}
