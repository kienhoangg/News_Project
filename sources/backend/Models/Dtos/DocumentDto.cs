using Contracts.Domains;

namespace Models.Dtos
{
    public class DocumentDto : DtoBase
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public DateTime PublishedDate { get; set; }

        public DateTime ExpiredDate { get; set; }

        public string FilePath { get; set; }
    }
}
