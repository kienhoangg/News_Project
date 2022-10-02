using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Common.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Entities.News;
using Models.Requests;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class NewsPostController : ControllerBase
    {
        private readonly INewsPostService _newsPostService;

        private readonly ISerializeService _serializeService;

        private readonly IMapper _mapper;

        public NewsPostController(
            INewsPostService newsPostService,
            IMapper mapper,
            ISerializeService serializeService
        )
        {
            _newsPostService = newsPostService;
            _mapper = mapper;
            _serializeService = serializeService;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetNewsPostByPaging([FromBody] NewsPostRequest newsPostRequest)
        {
            var result =
                await _newsPostService.GetNewsPostByPaging(newsPostRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateNewsPostDto([FromForm] NewsPostUploadDto newsPostUploadDto)
        {
            var newsPostDto =
                _serializeService
                    .Deserialize<NewsPostDto>(newsPostUploadDto.JsonString);
            
            var newsPost = _mapper.Map<NewsPost>(newsPostDto);
            await _newsPostService.CreateNewsPost(newsPost);
            var result = _mapper.Map<NewsPostDto>(newsPost);
            return Ok();
        }

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetNewsPostById([Required] long id)
        {
            NewsPost? newsPost = await _newsPostService.GetNewsPost(id);
            if (newsPost == null) return NotFound();

            var result = _mapper.Map<NewsPostDto>(newsPost);
            return Ok(result);
        }

        [HttpPut("{id:long}")]
        public async Task<IActionResult>
        UpdateNewsPostDto(
            [Required] long id,
            [FromBody] NewsPostDto newsPostDto
        )
        {
            NewsPost? NewsPost = await _newsPostService.GetNewsPost(id);
            if (NewsPost == null) return NotFound();
            var updatedNewsPost = _mapper.Map(newsPostDto, NewsPost);
            await _newsPostService.UpdateNewsPost(updatedNewsPost);
            var result = _mapper.Map<NewsPostDto>(updatedNewsPost);
            return Ok(result);
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> DeleteNewsPostDto([Required] long id)
        {
            NewsPost? newsPost = await _newsPostService.GetNewsPost(id);
            if (newsPost == null) return NotFound();

            await _newsPostService.DeleteNewsPost(id);
            return NoContent();
        }

        [HttpPost("UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFileCollection files)
        {
            foreach (var fileName in files)
            {
                var filesPath =
                    Directory.GetCurrentDirectory() + "/Uploadfiles";
                if (
                    !System.IO.Directory.Exists(filesPath) //create path
                )
                {
                    Directory.CreateDirectory (filesPath);
                }
                var path =
                    Path
                        .Combine(filesPath,
                        Path.GetFileName(fileName.FileName)); //the path to upload
                await fileName
                    .CopyToAsync(new FileStream(path, FileMode.Create));
            }
            return Ok();
        }
    }
}
