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
    public class QuestionsController : ControllerBase
    {
        private readonly IQuestionService _questionService;
        private readonly ISerializeService _serializeService;
        private readonly IMapper _mapper;

        public QuestionsController(
            IQuestionService questionService,
            IMapper mapper
,
            ISerializeService serializeService)
        {
            _questionService = questionService;
            _mapper = mapper;
            _serializeService = serializeService;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetQuestionByPaging([FromBody] QuestionRequest questionRequest)
        {
            var result =
                await _questionService.GetQuestionByPaging(questionRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
     CreateQuestionDto([FromForm] QuestionUploadDto questionUploadDto)
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
                    return BadRequest(new ApiErrorResult<Question
                    >(lstErrorString));
                }
            }
            string fileAttachmentPath = "";
            // Upload file attachment if exist
            if (questionUploadDto.FileAttachment != null)
            {
                fileAttachmentPath =
                    await questionUploadDto
                        .FileAttachment
                        .UploadFile(CommonConstants.FILE_ATTACHMENT_PATH);
            }


            var question = _serializeService
                    .Deserialize<Question>(questionUploadDto.JsonString);
            question.FilePath = fileAttachmentPath;
            await _questionService.CreateQuestion(question);

            var result = _mapper.Map<QuestionDto>(question);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetQuestionById([Required] int id)
        {
            Question? question = await _questionService.GetQuestion(id);
            if (question == null) return NotFound();

            var result = _mapper.Map<QuestionDto>(question);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateQuestionDto(
            [Required] int id,
            [FromBody] QuestionDto questionDto
        )
        {
            Question? Question = await _questionService.GetQuestion(id);
            if (Question == null) return NotFound();
            var updatedQuestion = _mapper.Map(questionDto, Question);
            await _questionService.UpdateQuestion(updatedQuestion);
            var result = _mapper.Map<QuestionDto>(updatedQuestion);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteQuestionDto([Required] int id)
        {
            Question? question = await _questionService.GetQuestion(id);
            if (question == null) return NotFound();

            await _questionService.DeleteQuestion(id);
            return NoContent();
        }
    }
}