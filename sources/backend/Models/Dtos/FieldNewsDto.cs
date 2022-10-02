using Contracts.Domains;

namespace Models.Dtos
{
    public class FieldNewsDto : DtoBase
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public int Order { get; set; }

        public decimal Factor { get; set; }

        public decimal BiggestFactor { get; set; }
    }
}
