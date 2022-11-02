using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using AutoMapper;
using AutoMapper.Internal;
using Common.Enums;
using Common.Extensions;
using Common.Interfaces;
using Common.Shared.Constants;
using Contracts.Interfaces;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Constants;
using Models.Dtos;
using Models.Dtos.Home;
using Models.Entities;
using Models.Requests;
using News.API.Authorization;
using News.API.Interfaces;

namespace News.API.Controllers
{

    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly AccessCounter _counter = AccessCounter.GetInstance();
        private readonly INewsPostService _newsPostService;
        private IJwtUtils _jwtUtils;
        private readonly ICategoryNewsService _categoryNewsService;
        private readonly IDocumentService _documentService;
        private readonly IQuestionService _questionService;
        private readonly IMenuService _menuService;
        private readonly IPhotoService _photoService;
        private readonly ICacheService _cacheService;
        private readonly IFieldNewsService _fieldNewsService;
        private readonly ICommentService _commentService;
        private readonly IQuestionCategoryService _questionCategoryService;

        private readonly ISerializeService _serializeService;
        private readonly ITokenService _tokenService;
        private readonly ICompanyInfoService _companyInfoService;
        private readonly ILinkInfoService _linkInfoService;
        private readonly IPhotoCategoryService _photoCategoryService;
        private readonly IVideoCategoryService _videoCategoryService;
        private readonly IVideoService _videoService;
        private readonly IStaticInfoService _staticInfoService;



        private readonly IMapper _mapper;

        public HomeController(
            INewsPostService newsPostService,
            ISerializeService serializeService,
            IMapper mapper,
            ICategoryNewsService categoryNewsService
,
            IDocumentService documentService,
            IQuestionService questionService,
            ITokenService tokenService,
            IJwtUtils jwtUtils,
            IMenuService menuService,
            IPhotoService photoService,
            ICacheService cacheService,
            IFieldNewsService fieldNewsService,
            ICompanyInfoService companyInfoService,
            ILinkInfoService linkInfoService,
            ICommentService commentService,
            IPhotoCategoryService photoCategoryService,
            IVideoService videoService,
            IQuestionCategoryService questionCategoryService,
            IVideoCategoryService videoCategoryService,
            IStaticInfoService staticInfoService)
        {
            _newsPostService = newsPostService;
            _serializeService = serializeService;
            _mapper = mapper;
            _categoryNewsService = categoryNewsService;
            _documentService = documentService;
            _questionService = questionService;
            _tokenService = tokenService;
            _jwtUtils = jwtUtils;
            _menuService = menuService;
            _photoService = photoService;
            _cacheService = cacheService;
            _fieldNewsService = fieldNewsService;
            _companyInfoService = companyInfoService;
            _linkInfoService = linkInfoService;
            _commentService = commentService;
            _photoCategoryService = photoCategoryService;
            _videoService = videoService;
            _questionCategoryService = questionCategoryService;
            _videoCategoryService = videoCategoryService;
            _staticInfoService = staticInfoService;
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
            //Update Views of news post
            await _newsPostService.UpdateManyNewsPostDto(new List<long> { id }, true, MultipleTypeUpdate.VIEWS_COUNT);
            var categoryParentNews = new CategoryNews();
            if (newsPost.CategoryNews != null)
            {
                var parentId = newsPost.CategoryNews.ParentId;
                categoryParentNews =
                   await _categoryNewsService.GetCategoryNews(parentId);
            }
            var lstNewsRelatives = new ApiSuccessResult<NewsPostDto>(new NewsPostDto());
            if (newsPost.CategoryNewsId.HasValue)
            {
                lstNewsRelatives =
                             await _newsPostService
                                 .GetNewsPostByPaging(new NewsPostRequest()
                                 {
                                     PageSize = 8,
                                     CurrentPage = 1,
                                     CategoryNewsId = newsPost.CategoryNewsId,
                                     OrderBy = "Order"
                                 });
            }

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

        [HttpGet("documents/master")]
        public async Task<IActionResult> GetMasterDataDocument()
        {
            var result = await _documentService.GetMasterDataDocument();
            return Ok(result);
        }
        [HttpPost("visitor/tracking")]
        public async Task<IActionResult> TrackingVisitor(VisitorTrackingDto visitorTrackingDto)
        {
            string clientId = visitorTrackingDto.ClientId;
            if (!String.IsNullOrEmpty(visitorTrackingDto.ClientId))
            {
                await _cacheService.SetCacheAsync(clientId, DateTime.Now.ToString("HHmmssfffffff"));
                return Ok(await _cacheService.GetCountKeys());
            }
            return NotFound();
        }

        [HttpGet("question")]
        public async Task<IActionResult> GetQuestionAnswer()
        {
            var result = await _questionService.GetQuestionHome();
            return Ok(result);
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
                    { PageSize = 5, Status = Status.Enabled },
                    lstInclude);
            if (fields == null) return NotFound();
            return Ok(fields.PagedData.Results);
        }
        [HttpPost("comments/filter")]
        public async Task<IActionResult>
       GetCommentByPaging([FromBody] CommentRequest commentRequest)
        {
            var lstInclude =
              new Expression<Func<Comment, object>>[] {
                    (x => x.NewsPost)
              };
            var result =
                await _commentService.GetCommentByPaging(commentRequest, lstInclude);
            return Ok(result);
        }

        [HttpPost("published/categorynews/{categoryNewsId:int}")]
        public async Task<IActionResult> GetNewsPostCategoryEachCategoryNews([Required] int categoryNewsId, [FromBody] NewsPostRequest newsPostRequest)
        {
            var result = await _newsPostService.GetNewsPostEachCategoryNews(categoryNewsId, newsPostRequest);
            return Ok(result);
        }

        [HttpPost("published/fieldNews/{fieldNewsId:int}")]
        public async Task<IActionResult> GetNewsPostCategoryEachFields([Required] int fieldNewsId, [FromBody] NewsPostRequest newsPostRequest)
        {
            var result = await _newsPostService.GetNewsPostCategoryEachFields(fieldNewsId, newsPostRequest);
            return Ok(result);
        }

        [HttpGet("menu")]
        public async Task<IActionResult> GetHomeMenu()
        {
            var result = await _menuService.GetHomeMenu();
            return Ok(result);
        }

        [HttpPost("question/filter")]
        public async Task<IActionResult>
     GetQuestionByPaging([FromBody] QuestionRequest questionRequest)
        {
            var result =
                await _questionService.GetQuestionByPaging(questionRequest);
            return Ok(result);
        }
        [HttpPost("questions")]
        public async Task<IActionResult>
             CreateQuestionDto([FromForm] QuestionUploadDto questionUploadDto)
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
                    return BadRequest(new ApiErrorResult<Question
                    >(lstErrorString));
                }
            }
            var question = _serializeService
                   .Deserialize<Question>(questionUploadDto.JsonString);
            if (HttpContext.Items["HandledStatus"] != null)
            {
                question.Status = Status.Enabled;
            }
            string fileAttachmentPath = "";
            // Upload file attachment if exist
            if (questionUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await questionUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }

            question.FilePath = fileAttachmentPath;
            await _questionService.CreateQuestion(question);

            var result = _mapper.Map<QuestionDto>(question);
            return Ok(result);
        }

        [HttpPost("photocategories/filter")]
        public async Task<IActionResult>
        GetPhotoCategoryByPaging([FromBody] PhotoCategoryRequest photoCategoryRequest)
        {
            var result =
                await _photoCategoryService.GetPhotoCategoryByPaging(photoCategoryRequest);
            return Ok(result);
        }

        [HttpGet("photocategories/{id:int}")]
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

        [HttpGet("photos/{id:int}")]
        public async Task<IActionResult> GetPhotoById([Required] int id)
        {
            Photo? photo = await _photoService.GetPhoto(id);
            if (photo == null) return NotFound();

            var result = _mapper.Map<PhotoDto>(photo);
            return Ok(result);
        }

        [HttpPost("comment")]
        public async Task<IActionResult>
      CreateCommentDto([FromBody] CommentDto commentDto)
        {
            var comment = _mapper.Map<Comment>(commentDto);
            await _commentService.CreateComment(comment);
            var result = _mapper.Map<CommentDto>(comment);
            return Ok(result);
        }

        [HttpGet("staticinfos/{id:int}")]
        public async Task<IActionResult> GetStaticInfoById([Required] int id)
        {
            StaticInfo? staticInfo = await _staticInfoService.GetStaticInfo(id);
            if (staticInfo == null) return NotFound();

            var result = _mapper.Map<StaticInfoDto>(staticInfo);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            _counter.Increase();
            // Get 5 hot news
            var hotNewsRequest =
                new NewsPostRequest()
                { PageSize = 10, CurrentPage = 1, OrderBy = "Order", IsHotNews = true, Status = Status.Enabled };
            var documentNewsRequest =
           new NewsPostRequest()
           { PageSize = 10, CurrentPage = 1, OrderBy = "Order", IsDocumentNews = true, Status = Status.Enabled };

            var lstHotNews =
                await _newsPostService.GetNewsPostByPaging(hotNewsRequest);
            var lstNewsDocuments =
           await _newsPostService.GetNewsPostByPaging(documentNewsRequest);
            var companyInfos = await _companyInfoService.GetCompanyInfoByPaging(new CompanyInfoRequest() { PageSize = 4, CurrentPage = 1, OrderBy = "Order" });
            var linkInfos = await _linkInfoService.GetLinkInfoByPaging(new LinkInfoRequest() { PageSize = 4, CurrentPage = 1, OrderBy = "Order" });
            var categoryNews = await _categoryNewsService.GetCategoryNewsFirstOrder();
            var categoryNewsId = categoryNews != null ? categoryNews.Id : 0;
            var normalNews =
                new NewsPostRequest()
                {
                    PageSize = 5,
                    CurrentPage = 1,
                    OrderBy = "Order",
                    CategoryNewsId = categoryNewsId,
                    Status = Status.Enabled
                };

            var lstNormalNews =
                await _newsPostService.GetNewsPostByPaging(normalNews);
            var lstDocuments =
                           (await _documentService.GetDocumentByPaging(new DocumentRequest()
                           {
                               PageSize = 15,
                               CurrentPage = 1,
                               OrderBy = "Order",
                               Direction = 1,
                               Status = Status.Enabled
                           })).PagedData.Results.ToList();
            if (
                lstHotNews.PagedData.Results.Count <= 0 &&
                lstNormalNews.PagedData.Results.Count <= 0 && lstDocuments.Count <= 0
            )
            {
                return NotFound(new ApiErrorResult<NewsPost
                >("Not found any news"));
            }
            var lstImages = (await _photoService.GetPhotoByPaging(new PhotoRequest()
            {
                CurrentPage = 1,
                PageSize = 15,
                OrderBy = "Order",
                Direction = 1,
                Status = Status.Enabled
            }, x => x.PhotoCategory)).PagedData.Results.ToList();
            int index = lstDocuments.Count / 2 + 1;

            var documentHots = new List<DocumentDto>();
            var documentSections = new List<DocumentDto>();
            if (lstDocuments.Count > 0)
            {
                documentHots = lstDocuments.GetRange(0, index);
                documentSections = lstDocuments.GetRange(index, lstDocuments.Count - index);
            }
            var result =
                new ApiSuccessResult<HomeDto>(new HomeDto()
                {
                    NewsHots = lstHotNews.PagedData.Results.ToList(),
                    NewsDocuments = lstNewsDocuments.PagedData.Results.ToList(),
                    CompanyInfos = companyInfos.PagedData.Results.ToList(),
                    LinkInfos = linkInfos.PagedData.Results.ToList(),
                    NewsSectionDto =
                            new NewsSectionDto()
                            {
                                CategoryNews =
                                    _mapper
                                        .Map
                                        <CategoryNewsDto
                                        >(await _categoryNewsService
                                            .GetCategoryNews(categoryNewsId)),
                                Data = lstNormalNews.PagedData.Results.ToList()
                            },
                    DocumentHots = documentHots,
                    DocumentSectionDto = documentSections,
                    Images = lstImages,
                    AccessCounter = _counter.GetValue(),
                    VisitorTracking = await _cacheService.GetCountKeys()
                });


            return Ok(result);
        }

        [HttpPost("videos/filter")]
        public async Task<IActionResult>
       GetVideoByPaging([FromBody] VideoRequest videoRequest)
        {
            var result =
                await _videoService.GetVideoByPaging(videoRequest);
            return Ok(result);
        }


        [HttpPost("videocategories/filter")]
        public async Task<IActionResult>
        GetVideoCategoryByPaging([FromBody] VideoCategoryRequest videoCategoryRequest)
        {
            var result =
                await _videoCategoryService.GetVideoCategoryByPaging(videoCategoryRequest);
            return Ok(result);
        }

        [HttpGet("documents/{id:int}")]
        public async Task<IActionResult> GetDocumentById([Required] int id)
        {
            var lstInclude =
             new Expression<Func<Document, object>>[] {
                    (x => x.DocumentDepartment),
                    (x => x.DocumentField),
                    (x => x.DocumentSignPerson),
                     (x => x.DocumentType)
             };
            Document? document = await _documentService.GetDocument(id, lstInclude);
            if (document == null) return NotFound();

            var result = _mapper.Map<DocumentDto>(document);
            return Ok(result);
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
     GetQuestionCategoryByPaging([FromBody] QuestionCategoryRequest questionCategoryRequest)
        {
            var result =
                await _questionCategoryService.GetQuestionCategoryByPaging(questionCategoryRequest);
            return Ok(result);
        }
        [HttpGet("videos/{id:int}")]
        public async Task<IActionResult> GetVideoById([Required] int id)
        {
            Video? video = await _videoService.GetVideo(id);
            if (video == null) return NotFound();

            var result = _mapper.Map<VideoDto>(video);
            return Ok(result);
        }

        [HttpPost("documents/filter")]
        public async Task<IActionResult>
        GetDocumentByPaging([FromBody] DocumentRequest documentRequest)
        {
            var result =
                await _documentService.GetDocumentByPaging(documentRequest);
            return Ok(result);
        }

        [HttpGet("questions/{id:int}")]
        public async Task<IActionResult> GetQuestionById([Required] int id)
        {
            Question? question = await _questionService.GetQuestion(id);
            if (question == null) return NotFound();

            var result = _mapper.Map<QuestionDto>(question);
            return Ok(result);
        }
        [HttpGet("questioncategories/{id:int}")]
        public async Task<IActionResult> GetQuestionCategoryById([Required] int id)
        {
            QuestionCategory? questionCategory = await _questionCategoryService.GetQuestionCategory(id);
            if (questionCategory == null) return NotFound();

            var result = _mapper.Map<QuestionCategoryDto>(questionCategory);
            return Ok(result);
        }
    }
}
