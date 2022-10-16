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
    public class PhotosController : ControllerBase
    {
        private readonly IPhotoService _photoService;

        private readonly IMapper _mapper;

        public PhotosController(
            IPhotoService photoService,
            IMapper mapper
        )
        {
            _photoService = photoService;
            _mapper = mapper;
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
        CreatePhotoDto([FromBody] PhotoDto photoDto)
        {
            var photo = _mapper.Map<Photo>(photoDto);
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
