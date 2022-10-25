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
    public class LinkInfoCategoriesController : ControllerBase
    {
        private readonly ILinkInfoCategoryService _linkInfoCategoryService;

        private readonly IMapper _mapper;

        public LinkInfoCategoriesController(
            ILinkInfoCategoryService linkInfoCategoryService,
            IMapper mapper
        )
        {
            _linkInfoCategoryService = linkInfoCategoryService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetLinkInfoCategoryByPaging([FromBody] LinkInfoCategoryRequest linkInfoCategoryRequest)
        {
            var result =
                await _linkInfoCategoryService.GetLinkInfoCategoryByPaging(linkInfoCategoryRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateLinkInfoCategoryDto([FromBody] LinkInfoCategoryDto linkInfoCategoryDto)
        {
            var linkInfoCategory = _mapper.Map<LinkInfoCategory>(linkInfoCategoryDto);
            await _linkInfoCategoryService.CreateLinkInfoCategory(linkInfoCategory);
            var result = _mapper.Map<LinkInfoCategoryDto>(linkInfoCategory);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetLinkInfoCategoryById([Required] int id)
        {
            LinkInfoCategory? linkInfoCategory = await _linkInfoCategoryService.GetLinkInfoCategory(id);
            if (linkInfoCategory == null) return NotFound();

            var result = _mapper.Map<LinkInfoCategoryDto>(linkInfoCategory);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateLinkInfoCategoryDto(
            [Required] int id,
            [FromBody] LinkInfoCategoryDto linkInfoCategoryDto
        )
        {
            LinkInfoCategory? LinkInfoCategory = await _linkInfoCategoryService.GetLinkInfoCategory(id);
            if (LinkInfoCategory == null) return NotFound();
            var updatedLinkInfoCategory = _mapper.Map(linkInfoCategoryDto, LinkInfoCategory);
            await _linkInfoCategoryService.UpdateLinkInfoCategory(updatedLinkInfoCategory);
            var result = _mapper.Map<LinkInfoCategoryDto>(updatedLinkInfoCategory);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteLinkInfoCategoryDto([Required] int id)
        {
            LinkInfoCategory? linkInfoCategory = await _linkInfoCategoryService.GetLinkInfoCategory(id);
            if (linkInfoCategory == null) return NotFound();

            await _linkInfoCategoryService.DeleteLinkInfoCategory(id);
            return NoContent();
        }
    }
}