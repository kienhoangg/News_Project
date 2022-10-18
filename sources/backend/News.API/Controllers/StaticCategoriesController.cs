using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Common.Extensions;
using Common.Interfaces;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Constants;
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
        private readonly ISerializeService _serializeService;
        private readonly IMapper _mapper;

        public StaticCategoriesController(
            IStaticCategoryService staticCategoryService,
            IMapper mapper
,
            ISerializeService serializeService)
        {
            _staticCategoryService = staticCategoryService;
            _mapper = mapper;
            _serializeService = serializeService;
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
      CreateStaticCategoryDto([FromForm] StaticCategoryUploadDto staticCategoryUploadDto)
        {
            if (!ModelState.IsValid)
            {
                // Cover case avatar extension not equal
                var lstError = ModelState.SelectMany(x => x.Value.Errors);
                if (lstError.Count() > 0)
                {
                    var lstErrorString = new List<string>();
                    foreach (var err in lstError)
                    {
                        lstErrorString.Add(err.ErrorMessage);
                    }
                    return BadRequest(new ApiErrorResult<StaticCategory
                    >(lstErrorString));
                }
            }
            string fileAttachmentPath = "";
            var staticCategory = _serializeService
                  .Deserialize<StaticCategory>(staticCategoryUploadDto.JsonString);
            // Upload file attachment if exist
            if (staticCategoryUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await staticCategoryUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }
            staticCategory.FilePath = fileAttachmentPath;
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
