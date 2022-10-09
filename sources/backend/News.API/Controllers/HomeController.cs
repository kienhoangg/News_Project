using AutoMapper;
using Common.Interfaces;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Dtos.Home;
using Models.Entities;
using Models.Requests;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly INewsPostService _newsPostService;

        private readonly ICategoryNewsService _categoryNewsService;

        private readonly ISerializeService _serializeService;

        private readonly IMapper _mapper;

        public HomeController(
            INewsPostService newsPostService,
            ISerializeService serializeService,
            IMapper mapper,
            ICategoryNewsService categoryNewsService
        )
        {
            _newsPostService = newsPostService;
            _serializeService = serializeService;
            _mapper = mapper;
            _categoryNewsService = categoryNewsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            // Get 5 hot news
            var hotNewsRequets =
                new NewsPostRequest()
                { PageSize = 10, OrderBy = "Order", IsHotNews = true };

            var lstHotNews =
                await _newsPostService.GetNewsPostByPaging(hotNewsRequets);
            var categoryNewsId = 5;
            var normalNews =
                new NewsPostRequest()
                {
                    PageSize = 5,
                    OrderBy = "Order",
                    CategoryNewsId = categoryNewsId
                };

            var lstNormalNews =
                await _newsPostService.GetNewsPostByPaging(normalNews);

            if (
                lstHotNews.PagedData.Results.Count <= 0 &&
                lstNormalNews.PagedData.Results.Count <= 0
            )
            {
                return NotFound(new ApiErrorResult<NewsPost
                >("Not found any news"));
            }
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
                            }
                });

            // Get CategoryNews with 5 normal news
            return Ok(result);
        }
    }
}
