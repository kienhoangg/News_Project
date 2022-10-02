using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class CategoryNewsController : ControllerBase
    {
        private readonly ICategoryNewsService _categoryNewsService;

        private readonly IMapper _mapper;

        public CategoryNewsController(
            ICategoryNewsService categoryNewsService,
            IMapper mapper
        )
        {
            _categoryNewsService = categoryNewsService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetCategoryNewsByPaging(
            [FromBody] CategoryNewsRequest categoryNewsRequest
        )
        {
            var result =
                await _categoryNewsService
                    .GetCategoryNewsByPaging(categoryNewsRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateCategoryNewsDto([FromBody] CategoryNewsDto categoryNewsDto)
        {
            var categoryNews = _mapper.Map<CategoryNews>(categoryNewsDto);
            await _categoryNewsService.CreateCategoryNews(categoryNews);
            var result = _mapper.Map<CategoryNewsDto>(categoryNews);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateCategoryNewsDto(
            [Required] int id,
            [FromBody] CategoryNewsDto categoryNewsDto
        )
        {
            CategoryNews? categoryNews =
                await _categoryNewsService.GetCategoryNews(id);
            if (categoryNews == null) return NotFound();
            var updatedCategoryNews =
                _mapper.Map(categoryNewsDto, categoryNews);
            await _categoryNewsService.UpdateCategoryNews(updatedCategoryNews);
            var result = _mapper.Map<CategoryNewsDto>(updatedCategoryNews);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult>
        DeleteCategoryNewsDto([Required] int id)
        {
            CategoryNews? categoryNews =
                await _categoryNewsService.GetCategoryNews(id);
            if (categoryNews == null) return NotFound();

            await _categoryNewsService.DeleteCategoryNews(id);
            return NoContent();
        }
    }
}
