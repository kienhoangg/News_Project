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
    public class NewsPostController : ControllerBase
    {
        private readonly INewsPostService _newsPostService;

        private readonly IFieldNewsService _fieldNewsService;

        private readonly ICategoryNewsService _categoryNewsService;

        private readonly ISerializeService _serializeService;

        private readonly IMapper _mapper;

        public NewsPostController(
            INewsPostService newsPostService,
            IMapper mapper,
            ISerializeService serializeService,
            ICategoryNewsService categoryNewsService,
            IFieldNewsService fieldNewsService
        )
        {
            _newsPostService = newsPostService;
            _mapper = mapper;
            _serializeService = serializeService;
            _categoryNewsService = categoryNewsService;
            _fieldNewsService = fieldNewsService;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetNewsPostByPaging([FromBody] NewsPostRequest newsPostRequest)
        {
            var lstInclude =
                new Expression<Func<NewsPost, object>>[] {
                    (x => x.FieldNews),
                    (x => x.SourceNews),
                    (x => x.CategoryNews)
                };
            var result =
                await _newsPostService
                    .GetNewsPostByPaging(newsPostRequest, lstInclude);
            return Ok(result);
        }

        [HttpGet("published/{id:int}")]
        public async Task<IActionResult> GetPublishedNewsById([Required] int id)
        {
            var lstInclude =
                new Expression<Func<NewsPost, object>>[] {
                    (x => x.SourceNews),
                    (x => x.CategoryNews)
                };
            var newsPost = await _newsPostService.GetNewsPost(id, lstInclude);
            if (newsPost == null) return NotFound("News is not found !");
            var parentId = newsPost.CategoryNews.ParentId;
            var categoryParentNews =
                await _categoryNewsService.GetCategoryNews(parentId);

            var lstNewsRelatives =
                await _newsPostService
                    .GetNewsPostByPaging(new NewsPostRequest()
                    {
                        PageSize = 8,
                        CategoryNewsId = newsPost.CategoryNewsId,
                        OrderBy = "Order"
                    });
            var result =
                new NewsPublishedDetailDto()
                {
                    NewsPostDetail = _mapper.Map<NewsPostDto>(newsPost),
                    CategoryParentNews =
                        _mapper.Map<CategoryNewsDto>(categoryParentNews),
                    NewsRelatives =
                        lstNewsRelatives
                            .PagedData
                            .Results
                            .Where(x => x.Id != id)
                            .ToList()
                };
            return Ok(result);
        }

        [HttpPost("file")]
        public async Task<IActionResult>
        FileUpload([FromForm] NewsPostUploadDto newsPostUploadDto)
        {
            string avartarPath = "";

            // Upload file avatar if exist
            if (newsPostUploadDto.Avatar != null)
            {
                avartarPath =
                    await newsPostUploadDto
                        .Avatar
                        .UploadFile(CommonConstants.IMAGES_PATH);
                return Ok(avartarPath);
            }
            return BadRequest();
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

            var newsPost =
                _serializeService
                    .Deserialize<NewsPost>(newsPostUploadDto.JsonString);

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
                newsPostDto.Id = newsPost.Id;
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
            var result = _mapper.Map<NewsPostDto>(source: updatedNewsPost);
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

        [HttpGet("published/fields")]
        public async Task<IActionResult> GetNewsPostEachFields()
        {
            Expression<Func<FieldNews, object>>[]? lstInclude =
                new Expression<Func<FieldNews, object>>[] {
                    (x => x.NewsPosts)
                };
            var fields =
                await _fieldNewsService
                    .GetFieldNewsByPaging(new FieldNewsRequest()
                    { PageSize = 5 },
                    lstInclude);
            if (fields == null) return NotFound();
            return Ok(fields.PagedData.Results);
        }
    }
}
