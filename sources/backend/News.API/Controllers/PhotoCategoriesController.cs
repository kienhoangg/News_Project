using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class PhotoCategoriesController : ControllerBase
    {
        private readonly IPhotoCategoryService _photoCategoryService;

        private readonly IMapper _mapper;

        public PhotoCategoriesController(
            IPhotoCategoryService photoCategoryService,
            IMapper mapper
        )
        {
            _photoCategoryService = photoCategoryService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetPhotoCategoryByPaging([FromBody] PhotoCategoryRequest photoCategoryRequest)
        {
            var result =
                await _photoCategoryService.GetPhotoCategoryByPaging(photoCategoryRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreatePhotoCategoryDto([FromBody] PhotoCategoryDto photoCategoryDto)
        {
            var photoCategory = _mapper.Map<PhotoCategory>(photoCategoryDto);
            await _photoCategoryService.CreatePhotoCategory(photoCategory);
            var result = _mapper.Map<PhotoCategoryDto>(photoCategory);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPhotoCategoryById([Required] int id)
        {
            var lstInclude =
             new Expression<Func<PhotoCategory, object>>[] {
                    (x => x.Photos)
             };
            PhotoCategory? photoCategory = await _photoCategoryService.GetPhotoCategory(id, lstInclude);
            if (photoCategory == null) return NotFound();

            var result = _mapper.Map<PhotoCategoryDto>(photoCategory);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdatePhotoCategoryDto(
            [Required] int id,
            [FromBody] PhotoCategoryDto photoCategoryDto
        )
        {
            PhotoCategory? PhotoCategory = await _photoCategoryService.GetPhotoCategory(id);
            if (PhotoCategory == null) return NotFound();
            var updatedPhotoCategory = _mapper.Map(photoCategoryDto, PhotoCategory);
            await _photoCategoryService.UpdatePhotoCategory(updatedPhotoCategory);
            var result = _mapper.Map<PhotoCategoryDto>(updatedPhotoCategory);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePhotoCategoryDto([Required] int id)
        {
            PhotoCategory? photoCategory = await _photoCategoryService.GetPhotoCategory(id);
            if (photoCategory == null) return NotFound();

            await _photoCategoryService.DeletePhotoCategory(id);
            return NoContent();
        }
    }
}
