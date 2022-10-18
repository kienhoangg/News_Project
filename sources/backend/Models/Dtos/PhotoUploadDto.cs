using Microsoft.AspNetCore.Http;

namespace Models.Dtos
{
    public class PhotoUploadDto
    {
        public int? Id { get; set; }

        public List<IFormFile>? FileAttachment { get; set; }

        public string? JsonString { get; set; }
    }
}