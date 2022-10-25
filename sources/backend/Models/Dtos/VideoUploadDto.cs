using System;
using Infrastructure.Shared.Attributes;
using Microsoft.AspNetCore.Http;

namespace Models.Dtos
{
    public class VideoUploadDto
    {
        public int? Id { get; set; }

        [AllowedExtensions("err", new string[] { ".jpg", ".png" })]
        public IFormFile? Avatar { get; set; }

        public IFormFile? FileAttachment { get; set; }

        public string? JsonString { get; set; }
    }
}
