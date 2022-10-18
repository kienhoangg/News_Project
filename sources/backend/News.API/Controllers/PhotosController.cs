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
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        private readonly IMapper _mapper;
        private readonly ISerializeService _serializeService;
        public PhotosController(
            IPhotoService photoService,
            IMapper mapper
,
            ISerializeService serializeService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _serializeService = serializeService;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetPhotoByPaging([FromBody] PhotoRequest photoRequest)
        {
            var result =
                await _photoService.GetPhotoByPaging(photoRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
         CreatePhotoDto([FromForm] PhotoUploadDto photoUploadDto)
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
                    return BadRequest(new ApiErrorResult<Photo
                    >(lstErrorString));
                }
            }
            var photo = _serializeService
         .Deserialize<Photo>(photoUploadDto.JsonString);
            string fileAttachmentPath = "";
            // Upload file attachment if exist
            if (photoUploadDto.FileAttachment != null)
            {
                List<string> lstStringFile = new List<string>();
                foreach (var item in photoUploadDto.FileAttachment)
                {
                    lstStringFile.Add(await item.UploadFile(CommonConstants.FILE_ATTACHMENT_PATH));
                }
                fileAttachmentPath = String.Join(";;", lstStringFile.ToArray());
            }
            photo.ImagePath = fileAttachmentPath;
            await _photoService.CreatePhoto(photo);

            var result = _mapper.Map<PhotoDto>(photo);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPhotoById([Required] int id)
        {
            Photo? photo = await _photoService.GetPhoto(id);
            if (photo == null) return NotFound();

            var result = _mapper.Map<PhotoDto>(photo);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdatePhotoDto(
            [Required] int id,
            [FromBody] PhotoDto photoDto
        )
        {
            Photo? Photo = await _photoService.GetPhoto(id);
            if (Photo == null) return NotFound();
            var updatedPhoto = _mapper.Map(photoDto, Photo);
            await _photoService.UpdatePhoto(updatedPhoto);
            var result = _mapper.Map<PhotoDto>(updatedPhoto);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePhotoDto([Required] int id)
        {
            Photo? photo = await _photoService.GetPhoto(id);
            if (photo == null) return NotFound();

            await _photoService.DeletePhoto(id);
            return NoContent();
        }
    }
}
