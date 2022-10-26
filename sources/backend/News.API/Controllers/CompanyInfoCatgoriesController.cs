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
    public class CompanyInfoCategoriesController : ControllerBase
    {
        private readonly ICompanyInfoCategoryService _companyInfoCategoryService;

        private readonly IMapper _mapper;

        public CompanyInfoCategoriesController(
            ICompanyInfoCategoryService companyInfoCategoryService,
            IMapper mapper
        )
        {
            _companyInfoCategoryService = companyInfoCategoryService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetCompanyInfoCategoryByPaging([FromBody] CompanyInfoCategoryRequest companyInfoCategoryRequest)
        {
            var result =
                await _companyInfoCategoryService.GetCompanyInfoCategoryByPaging(companyInfoCategoryRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateCompanyInfoCategoryDto([FromBody] CompanyInfoCategoryDto companyInfoCategoryDto)
        {
            var companyInfoCategory = _mapper.Map<CompanyInfoCategory>(companyInfoCategoryDto);
            await _companyInfoCategoryService.CreateCompanyInfoCategory(companyInfoCategory);
            var result = _mapper.Map<CompanyInfoCategoryDto>(companyInfoCategory);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetCompanyInfoCategoryById([Required] int id)
        {
            CompanyInfoCategory? companyInfoCategory = await _companyInfoCategoryService.GetCompanyInfoCategory(id);
            if (companyInfoCategory == null) return NotFound();

            var result = _mapper.Map<CompanyInfoCategoryDto>(companyInfoCategory);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateCompanyInfoCategoryDto(
            [Required] int id,
            [FromBody] CompanyInfoCategoryDto companyInfoCategoryDto
        )
        {
            CompanyInfoCategory? CompanyInfoCategory = await _companyInfoCategoryService.GetCompanyInfoCategory(id);
            if (CompanyInfoCategory == null) return NotFound();
            var updatedCompanyInfoCategory = _mapper.Map(companyInfoCategoryDto, CompanyInfoCategory);
            await _companyInfoCategoryService.UpdateCompanyInfoCategory(updatedCompanyInfoCategory);
            var result = _mapper.Map<CompanyInfoCategoryDto>(updatedCompanyInfoCategory);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteCompanyInfoCategoryDto([Required] int id)
        {
            CompanyInfoCategory? companyInfoCategory = await _companyInfoCategoryService.GetCompanyInfoCategory(id);
            if (companyInfoCategory == null) return NotFound();

            await _companyInfoCategoryService.DeleteCompanyInfoCategory(id);
            return NoContent();
        }
        [HttpPut("")]
        public async Task<IActionResult>
  UpdateManyCompanyInfoCategoryDto(
    [FromBody] UpdateManyDto<int> companyInfoCategoryUpdateManyDto
  )
        {
            await _companyInfoCategoryService.UpdateManyCompanyInfoCategoryDto(companyInfoCategoryUpdateManyDto.Ids, companyInfoCategoryUpdateManyDto.Value.Value, companyInfoCategoryUpdateManyDto.Field.Value);
            return NoContent();
        }
    }
}
