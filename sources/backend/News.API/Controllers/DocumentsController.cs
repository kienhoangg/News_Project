using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
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
            var document = _serializeService
                  .Deserialize<Document>(documentUploadDto.JsonString);
            // Upload file attachment if exist
            if (documentUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await documentUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }
            document.FilePath = fileAttachmentPath;
            await _documentService.CreateDocument(document);

            var result = _mapper.Map<DocumentDto>(document);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDocumentById([Required] int id)
        {
            var lstInclude =
             new Expression<Func<Document, object>>[] {
                    (x => x.DocumentDepartment),
                    (x => x.DocumentField),
                    (x => x.DocumentSignPerson),
                     (x => x.DocumentType)
             };
            Document? document = await _documentService.GetDocument(id, lstInclude);
            if (document == null) return NotFound();

            var result = _mapper.Map<DocumentDto>(document);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
      UpdateDocumentDto(
          [Required] int id,
          [FromForm] DocumentUploadDto documentUploadDto
      )
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
            Document? document = await _documentService.GetDocument(id);
            if (document == null) return NotFound();
            var tempFileAttachmentPath = document.FilePath;
            var documentUpdated = new Document();
            if (!string.IsNullOrEmpty(documentUploadDto.JsonString))
            {
                documentUpdated =
                    _serializeService
                        .Deserialize<Document>(documentUploadDto.JsonString);
                documentUpdated.Id = document.Id;
            }
            string fileAttachmentPath = !String.IsNullOrEmpty(documentUpdated.FilePath) ? documentUpdated.FilePath : "";
            // Upload file attachment if exist
            if (documentUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await documentUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }

            documentUpdated.FilePath = fileAttachmentPath;
             await _documentService.UpdateDocument(documentUpdated);

            if (fileAttachmentPath != tempFileAttachmentPath)
            {
                FileInfo fileFileAttachment =
                                     new FileInfo(Directory.GetCurrentDirectory() +
                                         "/wwwroot" + tempFileAttachmentPath);
                if (fileFileAttachment.Exists)
                {
                    fileFileAttachment.Delete();
                }
            }
            var result = _mapper.Map<DocumentDto>(source: documentUpdated);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDocumentDto([Required] int id)
        {
            Document? document = await _documentService.GetDocument(id);
            if (document == null) return NotFound();

            await _documentService.DeleteDocument(id);
            FileInfo fileFileAttachment =
                                    new FileInfo(Directory.GetCurrentDirectory() +
                                        document.FilePath);
            if (fileFileAttachment.Exists)
            {
                fileFileAttachment.Delete();
            }
            return NoContent();
        }
    }
}
