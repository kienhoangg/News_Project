using System.ComponentModel;

namespace Models.Dtos.Home
{
    public class HomeDto
    {
        public List<NewsPostDto> NewsHots { get; set; }

        public NewsSectionDto NewsSectionDto { get; set; }

        public List<DocumentDto> DocumentHots { get; set; }
        public List<DocumentDto> DocumentSectionDto { get; set; }
        public List<PhotoDto> Images { get; set; }
        public int AccessCounter { get; set; }
        public int VisitorTracking { get; set; }
    }
}
