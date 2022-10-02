using Contracts.Domains;
using Microsoft.AspNetCore.Http;

namespace Models.Dtos
{
    public class NewsPostDto : DtoBase
    {
        public int? CategoryNewsId { get; set; }

        public string? Title { get; set; }

        public DateTime? PublishedDate { get; set; }

        public bool? IsHotNews { get; set; }

        public bool? IsVideoNews { get; set; }

        public bool? IsShowTitle { get; set; }

        public bool? IsShowAvatar { get; set; }

        public bool? IsShowComment { get; set; }

        public string? AvatarTitle { get; set; }

        public string? Description { get; set; }

        public string? Content { get; set; }

        public int? CollaboratorId { get; set; }

        public int FieldNewsId { get; set; }

        public int? SourceNewsId { get; set; }
    }
}
