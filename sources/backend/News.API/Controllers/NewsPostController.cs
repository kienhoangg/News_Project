using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Common.Extensions;
using Common.Interfaces;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Constants;
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
                    return BadRequest(new ApiErrorResult<NewsPost
                    >(lstErrorString));
                }
            }

            string avartarPath = "";
            string fileAttachmentPath = "";

            // Upload file avatar if exist
            if (newsPostUploadDto.Avatar != null)
            {
                avartarPath =
                    await newsPostUploadDto
                        .Avatar
                        .UploadFile(CommonConstants.IMAGES_PATH);
            }

            // Upload file attachment if exist
            if (newsPostUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await newsPostUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }

            var newsPostDto =
                _serializeService
                    .Deserialize<NewsPostDto>(newsPostUploadDto.JsonString);

            var newsPost = _mapper.Map<NewsPost>(newsPostDto);
            newsPost.Avatar = avartarPath;
            newsPost.FilePath = fileAttachmentPath;
            await _newsPostService.CreateNewsPost(newsPost);
            var result = _mapper.Map<NewsPostDto>(newsPost);
            return Ok(result);
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
            [FromForm] NewsPostUploadDto newsPostUploadDto
        )
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
                    return BadRequest(new ApiErrorResult<NewsPost
                    >(lstErrorString));
                }
            }
            NewsPost? newsPost = await _newsPostService.GetNewsPost(id);
            var tempAvatarPath = newsPost.Avatar;
            var tempFileAttachmentPath = newsPost.FilePath;
            if (newsPost == null) return NotFound();
            var newsPostDto = new NewsPostDto();
            if (!string.IsNullOrEmpty(newsPostUploadDto.JsonString))
            {
                newsPostDto =
                    _serializeService
                        .Deserialize<NewsPostDto>(newsPostUploadDto.JsonString);
            }
            string avartarPath = "";
            string fileAttachmentPath = "";

            // Upload file avatar if exist
            if (newsPostUploadDto.Avatar != null)
            {
                avartarPath =
                    await newsPostUploadDto
                        .Avatar
                        .UploadFile(CommonConstants.IMAGES_PATH);
            }

            // Upload file attachment if exist
            if (newsPostUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await newsPostUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }

            var updatedNewsPost = _mapper.Map(newsPostDto, newsPost);
            updatedNewsPost.Avatar = avartarPath;
            updatedNewsPost.FilePath = fileAttachmentPath;
            updatedNewsPost.Title = "Test title";
            var resultUpdate =
                await _newsPostService.UpdateNewsPost(updatedNewsPost);

            if (resultUpdate > 0)
            {
                FileInfo fileAvatar =
                    new FileInfo(Directory.GetCurrentDirectory() +
                        tempAvatarPath);
                FileInfo fileFileAttachment =
                    new FileInfo(Directory.GetCurrentDirectory() +
                        tempFileAttachmentPath);

                // Clear old file upload if update success
                if (fileAvatar.Exists)
                {
                    fileAvatar.Delete();
                }
                if (fileFileAttachment.Exists)
                {
                    fileFileAttachment.Delete();
                }
            }
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
    }
}
