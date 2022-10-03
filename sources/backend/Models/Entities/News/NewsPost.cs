using Contracts.Domains;

namespace Models.Entities.News
{
    public class NewsPost : EntityAuditBase<long>
    {
        public int? CategoryNewsId { get; set; }

        public CategoryNews CategoryNews { get; set; }

        public string Title { get; set; }

        public DateTime PublishedDate { get; set; }

        public bool? IsHotNews { get; set; }

        public bool? IsVideoNews { get; set; }

        public bool? IsShowTitle { get; set; }

        public bool? IsShowAvatar { get; set; }

        public bool? IsShowComment { get; set; }

        public string? Avatar { get; set; }

        public string? AvatarTitle { get; set; }

        public string? Description { get; set; }

        public string? Content { get; set; }

        public int? CollaboratorId { get; set; }

        public virtual Collaborator? Collaborator { get; set; }

        public int? FieldNewsId { get; set; }

        public virtual FieldNews FieldNews { get; set; }

        public int? SourceNewsId { get; set; }

        public virtual SourceNews? SourceNews { get; set; }

        public string? FilePath { get; set; }
    }
}
