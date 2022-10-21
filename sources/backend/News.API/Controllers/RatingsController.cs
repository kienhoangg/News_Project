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
    public class RatingsController : ControllerBase
    {
        private readonly IRatingService _ratingService;

        private readonly IMapper _mapper;

        public RatingsController(
            IRatingService ratingService,
            IMapper mapper
        )
        {
            _ratingService = ratingService;
            _mapper = mapper;
        }

        [HttpPost("filter")]
        public async Task<IActionResult>
        GetRatingByPaging([FromBody] RatingRequest ratingRequest)
        {
            var result =
                await _ratingService.GetRatingByPaging(ratingRequest);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult>
        CreateRatingDto([FromBody] RatingDto ratingDto)
        {
            var rating = _mapper.Map<Rating>(ratingDto);
            await _ratingService.CreateRating(rating);
            var result = _mapper.Map<RatingDto>(rating);
            return Ok(result);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetRatingById([Required] int id)
        {
            Rating? rating = await _ratingService.GetRating(id);
            if (rating == null) return NotFound();

            var result = _mapper.Map<RatingDto>(rating);
            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult>
        UpdateRatingDto(
            [Required] int id,
            [FromBody] RatingDto ratingDto
        )
        {
            Rating? Rating = await _ratingService.GetRating(id);
            if (Rating == null) return NotFound();
            var updatedRating = _mapper.Map(ratingDto, Rating);
            await _ratingService.UpdateRating(updatedRating);
            var result = _mapper.Map<RatingDto>(updatedRating);
            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteRatingDto([Required] int id)
        {
            Rating? rating = await _ratingService.GetRating(id);
            if (rating == null) return NotFound();

            await _ratingService.DeleteRating(id);
            return NoContent();
        }
    }
}
