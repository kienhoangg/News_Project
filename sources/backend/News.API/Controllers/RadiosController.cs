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
    public class RadiosController : ControllerBase
    {
        private readonly IRadioService _radioService;

        private readonly IMapper _mapper;

        public RadiosController(
            IRadioService radioService,
            IMapper mapper
        )
        {
            _radioService = radioService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetRadioByPaging([FromBody] RadioRequest radioRequest)
        {
            var result =
                await _radioService.GetRadioByPaging(radioRequest);
            return Ok(result);
        }
        [ServiceFilter(typeof(HandleStatusByRoleAttribute))]
        [HttpPost]
        public async Task<IActionResult>
                CreateRadioDto([FromBody] RadioDto radioDto)
        {
            if (HttpContext.Items["HandledStatus"] != null)
            {
                radioDto.Status = Status.Enabled;
            }
            var radio = _mapper.Map<Radio>(radioDto);
            await _radioService.CreateRadio(radio);
            var result = _mapper.Map<RadioDto>(radio);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRadioById([Required] int id)
        {
            Radio? radio = await _radioService.GetRadio(id);
            if (radio == null) return NotFound();

            var result = _mapper.Map<RadioDto>(radio);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateRadioDto(
            [Required] int id,
            [FromBody] RadioDto radioDto
        )
        {
            radioDto.Id = id;
            Radio? Radio = await _radioService.GetRadio(id);
            if (Radio == null) return NotFound();
            var updatedRadio = _mapper.Map(radioDto, Radio);
            await _radioService.UpdateRadio(updatedRadio);
            var result = _mapper.Map<RadioDto>(updatedRadio);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRadioDto([Required] int id)
        {
            Radio? radio = await _radioService.GetRadio(id);
            if (radio == null) return NotFound();

            await _radioService.DeleteRadio(id);
            return NoContent();
        }

        [HttpPut("")]
        public async Task<IActionResult>
      UpdateManyRadioDto(
        [FromBody] UpdateManyDto<int> radioUpdateManyDto
      )
        {
            //  var lstRadioId = strRadioId.Split(',').Select(long.Parse).ToList();
            await _radioService.UpdateManyRadioDto(radioUpdateManyDto.Ids, radioUpdateManyDto.Value.Value, radioUpdateManyDto.Field.Value);
            return NoContent();
        }
    }
}
