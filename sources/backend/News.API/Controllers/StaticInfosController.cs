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
    public class StaticInfosController : ControllerBase
    {
        private readonly IStaticInfoService _staticInfoService;

        private readonly IMapper _mapper;

        public StaticInfosController(
            IStaticInfoService staticInfoService,
            IMapper mapper
        )
        {
            _staticInfoService = staticInfoService;
            _mapper = mapper;
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
        CreateStaticInfoDto([FromBody] StaticInfoDto staticInfoDto)
        {
            var staticInfo = _mapper.Map<StaticInfo>(staticInfoDto);
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
