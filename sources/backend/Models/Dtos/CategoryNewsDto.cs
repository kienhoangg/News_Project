using Contracts.Domains;
using Models.Entities.News;

namespace Models.Dtos
{
    public class CategoryNewsDto : DtoBase
    {
        public string CategoryNewsName { get; set; }

        public int Order { get; set; }

        public string? Keyword { get; set; }

        public FieldNews? FieldNews { get; set; }
    }
}
