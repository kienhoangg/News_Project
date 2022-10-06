using Models.Entities.News;

namespace Models.Dtos.Home
{
    public class HomeDto
    {
        public List<NewsPostDto> ListHotNews { get; set; }

        public List<NewsPostDto> ListNormalNews { get; set; }
    }
}
