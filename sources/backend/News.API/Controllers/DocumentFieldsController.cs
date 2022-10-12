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
    public class DocumentFieldsController : ControllerBase
    {
        private readonly IDocumentFieldService _documentFieldService;

        private readonly IMapper _mapper;

        public DocumentFieldsController(
            IDocumentFieldService documentFieldService,
            IMapper mapper
        )
        {
            _documentFieldService = documentFieldService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetDocumentFieldByPaging([FromBody] DocumentFieldRequest documentFieldRequest)
        {
            var result =
                await _documentFieldService.GetDocumentFieldByPaging(documentFieldRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateDocumentFieldDto([FromBody] DocumentFieldDto documentFieldDto)
        {
            var documentField = _mapper.Map<DocumentField>(documentFieldDto);
            await _documentFieldService.CreateDocumentField(documentField);
            var result = _mapper.Map<DocumentFieldDto>(documentField);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDocumentFieldById([Required] int id)
        {
            DocumentField? documentField = await _documentFieldService.GetDocumentField(id);
            if (documentField == null) return NotFound();

            var result = _mapper.Map<DocumentFieldDto>(documentField);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateDocumentFieldDto(
            [Required] int id,
            [FromBody] DocumentFieldDto documentFieldDto
        )
        {
            documentFieldDto.Id = id;
            DocumentField? DocumentField = await _documentFieldService.GetDocumentField(id);
            if (DocumentField == null) return NotFound();
            var updatedDocumentField = _mapper.Map(documentFieldDto, DocumentField);
            await _documentFieldService.UpdateDocumentField(updatedDocumentField);
            var result = _mapper.Map<DocumentFieldDto>(updatedDocumentField);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDocumentFieldDto([Required] int id)
        {
            DocumentField? documentField = await _documentFieldService.GetDocumentField(id);
            if (documentField == null) return NotFound();

            await _documentFieldService.DeleteDocumentField(id);
            return NoContent();
        }
    }
}
