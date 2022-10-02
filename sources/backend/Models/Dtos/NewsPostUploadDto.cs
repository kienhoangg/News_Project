using Infrastructure.Shared.Attributes;
using Microsoft.AspNetCore.Http;

namespace Models.Dtos
{
    public class NewsPostUploadDto
    {
        [AllowedExtensions("err", new string[] { ".jpg", ".png" })]
        public IFormFile Avatar { get; set; }

        public IFormFile FileAttachment { get; set; }

        public string JsonString { get; set; }
    }
}
