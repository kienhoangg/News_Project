using Contracts.Domains;

namespace Models.Entities
{
    public class DocumentType : EntityAuditBase<int>
    {
        public string Title { get; set; }
        public int? ParentId { get; set; }
        public string? Description { get; set; }
        public ICollection<Document> Documents { get; set; }
    }
}
