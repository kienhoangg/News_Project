using Contracts.Domains;
using Models.Entities.News;

namespace Models.Dtos
{
    public class CommentDto : DtoBase
    {
        public long Id { get; set; }

        public string Username { get; set; }

        public string Content { get; set; }

        public NewsPost NewsPost { get; set; }
    }
}
