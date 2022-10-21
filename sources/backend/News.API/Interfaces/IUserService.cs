using System;
using Models.Dtos;

namespace News.API.Interfaces
{
    public interface IUserService
    {
        Task<string> Authen(UserDto userDto);
    }
}
