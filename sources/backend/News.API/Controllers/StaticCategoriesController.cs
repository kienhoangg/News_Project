using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class StaticCategoriesController : ControllerBase
    {
        private readonly IStaticCategoryService _staticCategoryService;

        private readonly IMapper _mapper;

        public StaticCategoriesController(
            IStaticCategoryService staticCategoryService,
            IMapper mapper
        )
        {
            _staticCategoryService = staticCategoryService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetStaticCategoryByPaging([FromBody] StaticCategoryRequest staticCategoryRequest)
        {
            var result =
                await _staticCategoryService.GetStaticCategoryByPaging(staticCategoryRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateStaticCategoryDto([FromBody] StaticCategoryDto staticCategoryDto)
        {
            var staticCategory = _mapper.Map<StaticCategory>(staticCategoryDto);
            await _staticCategoryService.CreateStaticCategory(staticCategory);
            var result = _mapper.Map<StaticCategoryDto>(staticCategory);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStaticCategoryById([Required] int id)
        {
            StaticCategory? staticCategory = await _staticCategoryService.GetStaticCategory(id);
            if (staticCategory == null) return NotFound();

            var result = _mapper.Map<StaticCategoryDto>(staticCategory);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateStaticCategoryDto(
            [Required] int id,
            [FromBody] StaticCategoryDto staticCategoryDto
        )
        {
            StaticCategory? StaticCategory = await _staticCategoryService.GetStaticCategory(id);
            if (StaticCategory == null) return NotFound();
            var updatedStaticCategory = _mapper.Map(staticCategoryDto, StaticCategory);
            await _staticCategoryService.UpdateStaticCategory(updatedStaticCategory);
            var result = _mapper.Map<StaticCategoryDto>(updatedStaticCategory);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStaticCategoryDto([Required] int id)
        {
            StaticCategory? staticCategory = await _staticCategoryService.GetStaticCategory(id);
            if (staticCategory == null) return NotFound();

            await _staticCategoryService.DeleteStaticCategory(id);
            return NoContent();
        }
    }
}
