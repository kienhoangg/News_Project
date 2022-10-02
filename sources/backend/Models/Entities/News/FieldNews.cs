using Contracts.Domains;

namespace Models.Entities.News
{
    public class FieldNews : EntityAuditBase<int>
    {
        public string Title { get; set; }

        public string? Description { get; set; }

        public int Order { get; set; }

        public decimal Factor { get; set; }

        public decimal BiggestFactor { get; set; }

        public ICollection<NewsPost> NewsPosts { get; set; }
    }
}
