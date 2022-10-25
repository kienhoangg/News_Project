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
    public class LinkInfosController : ControllerBase
    {
        private readonly ILinkInfoService _linkInfoService;

        private readonly IMapper _mapper;

        public LinkInfosController(
            ILinkInfoService linkInfoService,
            IMapper mapper
        )
        {
            _linkInfoService = linkInfoService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetLinkInfoByPaging([FromBody] LinkInfoRequest linkInfoRequest)
        {
            var result =
                await _linkInfoService.GetLinkInfoByPaging(linkInfoRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateLinkInfoDto([FromBody] LinkInfoDto linkInfoDto)
        {
            var linkInfo = _mapper.Map<LinkInfo>(linkInfoDto);
            await _linkInfoService.CreateLinkInfo(linkInfo);
            var result = _mapper.Map<LinkInfoDto>(linkInfo);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetLinkInfoById([Required] int id)
        {
            LinkInfo? linkInfo = await _linkInfoService.GetLinkInfo(id);
            if (linkInfo == null) return NotFound();

            var result = _mapper.Map<LinkInfoDto>(linkInfo);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateLinkInfoDto(
            [Required] int id,
            [FromBody] LinkInfoDto linkInfoDto
        )
        {
            LinkInfo? LinkInfo = await _linkInfoService.GetLinkInfo(id);
            if (LinkInfo == null) return NotFound();
            var updatedLinkInfo = _mapper.Map(linkInfoDto, LinkInfo);
            await _linkInfoService.UpdateLinkInfo(updatedLinkInfo);
            var result = _mapper.Map<LinkInfoDto>(updatedLinkInfo);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteLinkInfoDto([Required] int id)
        {
            LinkInfo? linkInfo = await _linkInfoService.GetLinkInfo(id);
            if (linkInfo == null) return NotFound();

            await _linkInfoService.DeleteLinkInfo(id);
            return NoContent();
        }
    }
}
