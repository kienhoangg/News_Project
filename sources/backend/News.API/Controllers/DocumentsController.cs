using Microsoft.AspNetCore.Mvc;
using Models.Requests;
using News.API.Interfaces;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        [HttpPost]
        public async Task<IActionResult> GetDocumentsByPaging([FromBody] DocumentRequest documentRequest, [FromQuery] int currentPage)
        {

            var result = await _documentService.GetDocumentsByPaging(documentRequest, currentPage);
            return Ok(result);
        }
    }
}

