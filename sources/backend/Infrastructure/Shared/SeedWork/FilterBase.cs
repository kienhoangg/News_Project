using Common.Enums;

namespace Infrastructure.Shared.SeedWork
{
    public class FilterBase
    {
        public string Keyword { get; set; }
        public Status? Status { get; set; }
        public int? PageSize { get; set; }

        public int? CurrentPage { get; set; }

        public int? Direction { get; set; }

        public string OrderBy { get; set; }
        public List<int> Ids { get; set; }
    }
}
