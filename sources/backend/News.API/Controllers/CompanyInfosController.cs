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
    public class CompanyInfosController : ControllerBase
    {
        private readonly ICompanyInfoService _companyInfoService;

        private readonly IMapper _mapper;

        public CompanyInfosController(
            ICompanyInfoService companyInfoService,
            IMapper mapper
        )
        {
            _companyInfoService = companyInfoService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetCompanyInfoByPaging([FromBody] CompanyInfoRequest companyInfoRequest)
        {
            var result =
                await _companyInfoService.GetCompanyInfoByPaging(companyInfoRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateCompanyInfoDto([FromBody] CompanyInfoDto companyInfoDto)
        {
            var companyInfo = _mapper.Map<CompanyInfo>(companyInfoDto);
            await _companyInfoService.CreateCompanyInfo(companyInfo);
            var result = _mapper.Map<CompanyInfoDto>(companyInfo);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCompanyInfoById([Required] int id)
        {
            CompanyInfo? companyInfo = await _companyInfoService.GetCompanyInfo(id);
            if (companyInfo == null) return NotFound();

            var result = _mapper.Map<CompanyInfoDto>(companyInfo);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateCompanyInfoDto(
            [Required] int id,
            [FromBody] CompanyInfoDto companyInfoDto
        )
        {
            CompanyInfo? CompanyInfo = await _companyInfoService.GetCompanyInfo(id);
            if (CompanyInfo == null) return NotFound();
            var updatedCompanyInfo = _mapper.Map(companyInfoDto, CompanyInfo);
            await _companyInfoService.UpdateCompanyInfo(updatedCompanyInfo);
            var result = _mapper.Map<CompanyInfoDto>(updatedCompanyInfo);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCompanyInfoDto([Required] int id)
        {
            CompanyInfo? companyInfo = await _companyInfoService.GetCompanyInfo(id);
            if (companyInfo == null) return NotFound();

            await _companyInfoService.DeleteCompanyInfo(id);
            return NoContent();
        }
    }
}
