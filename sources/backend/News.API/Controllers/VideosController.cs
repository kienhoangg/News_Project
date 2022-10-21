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
    public class VideosController : ControllerBase
    {
        private readonly IVideoService _videoService;

        private readonly IMapper _mapper;

        public VideosController(
            IVideoService videoService,
            IMapper mapper
        )
        {
            _videoService = videoService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetVideoByPaging([FromBody] VideoRequest videoRequest)
        {
            var result =
                await _videoService.GetVideoByPaging(videoRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateVideoDto([FromBody] VideoDto videoDto)
        {
            var video = _mapper.Map<Video>(videoDto);
            await _videoService.CreateVideo(video);
            var result = _mapper.Map<VideoDto>(video);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetVideoById([Required] int id)
        {
            Video? video = await _videoService.GetVideo(id);
            if (video == null) return NotFound();

            var result = _mapper.Map<VideoDto>(video);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateVideoDto(
            [Required] int id,
            [FromBody] VideoDto videoDto
        )
        {
            Video? Video = await _videoService.GetVideo(id);
            if (Video == null) return NotFound();
            var updatedVideo = _mapper.Map(videoDto, Video);
            await _videoService.UpdateVideo(updatedVideo);
            var result = _mapper.Map<VideoDto>(updatedVideo);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteVideoDto([Required] int id)
        {
            Video? video = await _videoService.GetVideo(id);
            if (video == null) return NotFound();

            await _videoService.DeleteVideo(id);
            return NoContent();
        }
    }
}
