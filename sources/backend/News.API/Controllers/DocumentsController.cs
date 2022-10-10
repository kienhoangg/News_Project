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
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;
        private readonly ISerializeService _serializeService;

        private readonly IMapper _mapper;

        public DocumentsController(
            IDocumentService documentService,
            IMapper mapper
,
            ISerializeService serializeService)
        {
            _documentService = documentService;
            _mapper = mapper;
            _serializeService = serializeService;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetDocumentByPaging([FromBody] DocumentRequest documentRequest)
        {
            var result =
                await _documentService.GetDocumentByPaging(documentRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateDocumentDto([FromForm] DocumentUploadDto documentUploadDto)
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
                    return BadRequest(new ApiErrorResult<Document
                    >(lstErrorString));
                }
            }
            string fileAttachmentPath = "";
            // Upload file attachment if exist
            if (documentUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await documentUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }


            var document = _serializeService
                    .Deserialize<Document>(documentUploadDto.JsonString);
            document.FilePath = fileAttachmentPath;
            await _documentService.CreateDocument(document);

            var result = _mapper.Map<DocumentDto>(document);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDocumentById([Required] int id)
        {
            Document? document = await _documentService.GetDocument(id);
            if (document == null) return NotFound();

            var result = _mapper.Map<DocumentDto>(document);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateDocumentDto(
            [Required] int id,
            [FromBody] DocumentDto documentDto
        )
        {
            documentDto.Id = id;
            Document? Document = await _documentService.GetDocument(id);
            if (Document == null) return NotFound();
            var updatedDocument = _mapper.Map(documentDto, Document);
            await _documentService.UpdateDocument(updatedDocument);
            var result = _mapper.Map<DocumentDto>(updatedDocument);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDocumentDto([Required] int id)
        {
            Document? document = await _documentService.GetDocument(id);
            if (document == null) return NotFound();

            await _documentService.DeleteDocument(id);
            return NoContent();
        }
    }
}
