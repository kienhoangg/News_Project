using System;
using Common.Interfaces;
using Common.Shared.Constants;
using Infrastructure.Implements;
using Microsoft.EntityFrameworkCore;
using Models.Dtos;
using Models.Entities;
using News.API.Authorization;
using News.API.Interfaces;
using News.API.Persistence;

namespace News.API.Services
{
    public class UserService : RepositoryBase<User, int, NewsContext>, IUserService
    {
        private IJwtUtils _jwtUtils;
        public UserService(NewsContext dbContext, IUnitOfWork<NewsContext> unitOfWork, IJwtUtils jwtUtils) : base(dbContext, unitOfWork)
        {
            _jwtUtils = jwtUtils;
        }

        public async Task<string> Authen(UserDto userDto)
        {
            var query = FindAll();
            var validUser = await query.Where(x => x.Username == userDto.Username && x.Password == userDto.Password).FirstOrDefaultAsync();
            var jwtToken = string.Empty;
            if (validUser != null)
            {
                switch (userDto.Username)
                {
                    case "admin":
                        jwtToken = _jwtUtils.GenerateJwtToken(RoleCode.ADMIN.ToString());
                        break;
                    case "siteadmin":
                        jwtToken = _jwtUtils.GenerateJwtToken(RoleCode.SITE_ADMIN.ToString());
                        break;
                    default:
                        break;
                }
            }
            return jwtToken;
        }
    }
}
