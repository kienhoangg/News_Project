using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Common.Enums;
using Common.Shared.Constants;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using Models.Entities;
using Models.Requests;
using News.API.Authorization;
using News.API.Filter;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Authorize(RoleCode.ADMIN, RoleCode.SITE_ADMIN)]
    [Route("api/[controller]")]
    public class PublicInformationsController : ControllerBase
    {
        private readonly IPublicInformationService _publicInformationService;

        private readonly IMapper _mapper;

        public PublicInformationsController(
            IPublicInformationService publicInformationService,
            IMapper mapper
        )
        {
            _publicInformationService = publicInformationService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetPublicInformationByPaging([FromBody] PublicInformationRequest publicInformationRequest)
        {
            var result =
                await _publicInformationService.GetPublicInformationByPaging(publicInformationRequest);
            return Ok(result);
        }
        [ServiceFilter(typeof(HandleStatusByRoleAttribute))]
        [HttpPost]
        public async Task<IActionResult>
                CreatePublicInformationDto([FromBody] PublicInformationDto publicInformationDto)
        {
            if (HttpContext.Items["HandledStatus"] != null)
            {
                publicInformationDto.Status = Status.Enabled;
            }
            var publicInformation = _mapper.Map<PublicInformation>(publicInformationDto);
            await _publicInformationService.CreatePublicInformation(publicInformation);
            var result = _mapper.Map<PublicInformationDto>(publicInformation);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetPublicInformationById([Required] int id)
        {
            PublicInformation? publicInformation = await _publicInformationService.GetPublicInformation(id);
            if (publicInformation == null) return NotFound();

            var result = _mapper.Map<PublicInformationDto>(publicInformation);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdatePublicInformationDto(
            [Required] int id,
            [FromBody] PublicInformationDto publicInformationDto
        )
        {
            publicInformationDto.Id = id;
            PublicInformation? PublicInformation = await _publicInformationService.GetPublicInformation(id);
            if (PublicInformation == null) return NotFound();
            var updatedPublicInformation = _mapper.Map(publicInformationDto, PublicInformation);
            await _publicInformationService.UpdatePublicInformation(updatedPublicInformation);
            var result = _mapper.Map<PublicInformationDto>(updatedPublicInformation);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeletePublicInformationDto([Required] int id)
        {
            PublicInformation? publicInformation = await _publicInformationService.GetPublicInformation(id);
            if (publicInformation == null) return NotFound();

            await _publicInformationService.DeletePublicInformation(id);
            return NoContent();
        }

        [HttpPut("")]
        public async Task<IActionResult>
      UpdateManyPublicInformationDto(
        [FromBody] UpdateManyDto<int> publicInformationUpdateManyDto
      )
        {
            //  var lstPublicInformationId = strPublicInformationId.Split(',').Select(long.Parse).ToList();
            await _publicInformationService.UpdateManyPublicInformationDto(publicInformationUpdateManyDto.Ids, publicInformationUpdateManyDto.Value.Value, publicInformationUpdateManyDto.Field.Value);
            return NoContent();
        }
    }
}
