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

    [Route("api/[controller]")]
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        private readonly IMapper _mapper;

        public FeedbacksController(
            IFeedbackService feedbackService,
            IMapper mapper
        )
        {
            _feedbackService = feedbackService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetFeedbackByPaging([FromBody] FeedbackRequest feedbackRequest)
        {
            var result =
                await _feedbackService.GetFeedbackByPaging(feedbackRequest);
            return Ok(result);
        }
        [ServiceFilter(typeof(HandleStatusByRoleAttribute))]
        [HttpPost]
        public async Task<IActionResult>
                CreateFeedbackDto([FromBody] FeedbackDto feedbackDto)
        {
            if (HttpContext.Items["HandledStatus"] != null)
            {
                feedbackDto.Status = Status.Enabled;
            }
            var feedback = _mapper.Map<Feedback>(feedbackDto);
            await _feedbackService.CreateFeedback(feedback);
            var result = _mapper.Map<FeedbackDto>(feedback);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetFeedbackById([Required] int id)
        {
            Feedback? feedback = await _feedbackService.GetFeedback(id);
            if (feedback == null) return NotFound();

            var result = _mapper.Map<FeedbackDto>(feedback);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateFeedbackDto(
            [Required] int id,
            [FromBody] FeedbackDto feedbackDto
        )
        {
            feedbackDto.Id = id;
            Feedback? Feedback = await _feedbackService.GetFeedback(id);
            if (Feedback == null) return NotFound();
            var updatedFeedback = _mapper.Map(feedbackDto, Feedback);
            await _feedbackService.UpdateFeedback(updatedFeedback);
            var result = _mapper.Map<FeedbackDto>(updatedFeedback);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFeedbackDto([Required] int id)
        {
            Feedback? feedback = await _feedbackService.GetFeedback(id);
            if (feedback == null) return NotFound();

            await _feedbackService.DeleteFeedback(id);
            return NoContent();
        }

        [HttpPut("")]
        public async Task<IActionResult>
      UpdateManyFeedbackDto(
        [FromBody] UpdateManyDto<int> feedbackUpdateManyDto
      )
        {
            //  var lstFeedbackId = strFeedbackId.Split(',').Select(long.Parse).ToList();
            await _feedbackService.UpdateManyFeedbackDto(feedbackUpdateManyDto.Ids, feedbackUpdateManyDto.Value.Value, feedbackUpdateManyDto.Field.Value);
            return NoContent();
        }
    }
}
