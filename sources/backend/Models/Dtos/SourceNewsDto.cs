using Contracts.Domains;

namespace Models.Dtos
{
    public class SourceNewsDto : DtoBase
    {
        public string Title { get; set; }

        public int Order { get; set; }

        public string? Description { get; set; }
    }
}
