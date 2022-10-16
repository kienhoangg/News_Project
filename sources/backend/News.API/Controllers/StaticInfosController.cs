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
    public class StaticInfosController : ControllerBase
    {
        private readonly IStaticInfoService _staticInfoService;
        private readonly ISerializeService _serializeService;
        private readonly IMapper _mapper;

        public StaticInfosController(
            IStaticInfoService staticInfoService,
            IMapper mapper
,
            ISerializeService serializeService)
        {
            _staticInfoService = staticInfoService;
            _mapper = mapper;
            _serializeService = serializeService;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetStaticInfoByPaging([FromBody] StaticInfoRequest staticInfoRequest)
        {
            var result =
                await _staticInfoService.GetStaticInfoByPaging(staticInfoRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
      CreateStaticInfoDto([FromForm] StaticInfoUploadDto staticInfoUploadDto)
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
                    return BadRequest(new ApiErrorResult<StaticInfo
                    >(lstErrorString));
                }
            }
            string fileAttachmentPath = "";
            // Upload file attachment if exist
            if (staticInfoUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await staticInfoUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }


            var staticInfo = _serializeService
                    .Deserialize<StaticInfo>(staticInfoUploadDto.JsonString);
            staticInfo.FilePath = fileAttachmentPath;
            await _staticInfoService.CreateStaticInfo(staticInfo);

            var result = _mapper.Map<StaticInfoDto>(staticInfo);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetStaticInfoById([Required] int id)
        {
            StaticInfo? staticInfo = await _staticInfoService.GetStaticInfo(id);
            if (staticInfo == null) return NotFound();

            var result = _mapper.Map<StaticInfoDto>(staticInfo);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateStaticInfoDto(
            [Required] int id,
            [FromBody] StaticInfoDto staticInfoDto
        )
        {
            StaticInfo? StaticInfo = await _staticInfoService.GetStaticInfo(id);
            if (StaticInfo == null) return NotFound();
            var updatedStaticInfo = _mapper.Map(staticInfoDto, StaticInfo);
            await _staticInfoService.UpdateStaticInfo(updatedStaticInfo);
            var result = _mapper.Map<StaticInfoDto>(updatedStaticInfo);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteStaticInfoDto([Required] int id)
        {
            StaticInfo? staticInfo = await _staticInfoService.GetStaticInfo(id);
            if (staticInfo == null) return NotFound();

            await _staticInfoService.DeleteStaticInfo(id);
            return NoContent();
        }
    }
}
