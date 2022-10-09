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
    public class DocumentTypesController : ControllerBase
    {
        private readonly IDocumentFieldService _documentTypeService;

        private readonly IMapper _mapper;

        public DocumentTypesController(
            IDocumentFieldService documentTypeService,
            IMapper mapper
        )
        {
            _documentTypeService = documentTypeService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetDocumentFieldByPaging([FromBody] DocumentFieldRequest documentTypeRequest)
        {
            var result =
                await _documentTypeService.GetDocumentFieldByPaging(documentTypeRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateDocumentFieldDto([FromBody] DocumentFieldDto documentTypeDto)
        {
            var documentType = _mapper.Map<DocumentField>(documentTypeDto);
            await _documentTypeService.CreateDocumentField(documentType);
            var result = _mapper.Map<DocumentFieldDto>(documentType);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDocumentFieldById([Required] int id)
        {
            DocumentField? documentType = await _documentTypeService.GetDocumentField(id);
            if (documentType == null) return NotFound();

            var result = _mapper.Map<DocumentFieldDto>(documentType);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateDocumentFieldDto(
            [Required] int id,
            [FromBody] DocumentFieldDto documentTypeDto
        )
        {
            documentTypeDto.Id = id;
            DocumentField? DocumentField = await _documentTypeService.GetDocumentField(id);
            if (DocumentField == null) return NotFound();
            var updatedDocumentField = _mapper.Map(documentTypeDto, DocumentField);
            await _documentTypeService.UpdateDocumentField(updatedDocumentField);
            var result = _mapper.Map<DocumentFieldDto>(updatedDocumentField);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDocumentFieldDto([Required] int id)
        {
            DocumentField? documentType = await _documentTypeService.GetDocumentField(id);
            if (documentType == null) return NotFound();

            await _documentTypeService.DeleteDocumentField(id);
            return NoContent();
        }
    }
}
