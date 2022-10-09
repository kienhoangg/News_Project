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
    public class FieldNewsController : ControllerBase
    {
        private readonly IFieldNewsService _fieldNewsService;

        private readonly IMapper _mapper;

        public FieldNewsController(
            IFieldNewsService fieldNewsService,
            IMapper mapper
        )
        {
            _fieldNewsService = fieldNewsService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetFieldNewsByPaging([FromBody] FieldNewsRequest fieldNewsRequest)
        {
            var result =
                await _fieldNewsService.GetFieldNewsByPaging(fieldNewsRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateFieldNewsDto([FromBody] FieldNewsDto fieldNewsDto)
        {
            var fieldNews = _mapper.Map<FieldNews>(fieldNewsDto);
            await _fieldNewsService.CreateFieldNews(fieldNews);
            var result = _mapper.Map<FieldNewsDto>(fieldNews);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetFieldNewsById([Required] int id)
        {
            FieldNews? fieldNews = await _fieldNewsService.GetFieldNews(id);
            if (fieldNews == null) return NotFound();

            var result = _mapper.Map<FieldNewsDto>(fieldNews);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateFieldNewsDto(
            [Required] int id,
            [FromBody] FieldNewsDto fieldNewsDto
        )
        {
            FieldNews? FieldNews = await _fieldNewsService.GetFieldNews(id);
            if (FieldNews == null) return NotFound();
            var updatedFieldNews = _mapper.Map(fieldNewsDto, FieldNews);
            await _fieldNewsService.UpdateFieldNews(updatedFieldNews);
            var result = _mapper.Map<FieldNewsDto>(updatedFieldNews);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFieldNewsDto([Required] int id)
        {
            FieldNews? fieldNews = await _fieldNewsService.GetFieldNews(id);
            if (fieldNews == null) return NotFound();

            await _fieldNewsService.DeleteFieldNews(id);
            return NoContent();
        }
    }
}
