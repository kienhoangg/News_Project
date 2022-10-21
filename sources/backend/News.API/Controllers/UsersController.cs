using System;
using AutoMapper;
using Infrastructure.Shared.SeedWork;
using Microsoft.AspNetCore.Mvc;
using Models.Dtos;
using News.API.Interfaces;

namespace News.API.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public UsersController(
            IUserService userService,
            IMapper mapper
        )
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost()]
        public async Task<IActionResult> Authen(UserDto userDto)
        {
            string token = await _userService.Authen(userDto);
            if (!string.IsNullOrEmpty(token))
            {
                return Ok(new ApiSuccessResult<String>(token));
            }
            return BadRequest();
        }
    }
}
