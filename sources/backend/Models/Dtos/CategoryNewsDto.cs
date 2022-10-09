using Contracts.Domains;

namespace Models.Dtos
{
    public class CategoryNewsDto : DtoBase
    {
        public int Id { get; set; }

        public string CategoryNewsName { get; set; }

        public int Order { get; set; }

        public string? Keyword { get; set; }

        public FieldNewsDto? FieldNews { get; set; }
    }
}
