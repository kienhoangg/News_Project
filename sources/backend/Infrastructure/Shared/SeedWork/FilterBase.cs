namespace Infrastructure.Shared.SeedWork
{
    public class FilterBase
    {
        public string Keyword { get; set; }

        public int? PageSize { get; set; }

        public int? CurrentPage { get; set; }

        public int? Direction { get; set; }

        public string OrderBy { get; set; }
    }
}
