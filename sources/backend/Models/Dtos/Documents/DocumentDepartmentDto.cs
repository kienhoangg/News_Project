using Contracts.Domains;

namespace Models.Dtos.Documents
{
    public class DocumentDepartmentDto : DtoBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? ParentId { get; set; }
        public string? Description { get; set; }
    }
}