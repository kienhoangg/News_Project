using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
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
    public class PhotoCategoriesController : ControllerBase
    {
        private readonly IPhotoCategoryService _photoCategoryService;
        private readonly ISerializeService _serializeService;
        private readonly IMapper _mapper;

        public PhotoCategoriesController(
            IPhotoCategoryService photoCategoryService,
            IMapper mapper
,
            ISerializeService serializeService = null)
        {
            _photoCategoryService = photoCategoryService;
            _mapper = mapper;
            _serializeService = serializeService;
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
      CreatePhotoCategoryDto([FromForm] PhotoCategoryUploadDto photoCategoryUploadDto)
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
                    return BadRequest(new ApiErrorResult<PhotoCategory
                    >(lstErrorString));
                }
            }
            string fileAttachmentPath = "";
            // Upload file attachment if exist
            if (photoCategoryUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await photoCategoryUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }


            var photoCategory = _serializeService
                    .Deserialize<PhotoCategory>(photoCategoryUploadDto.JsonString);
            photoCategory.FilePath = fileAttachmentPath;
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
