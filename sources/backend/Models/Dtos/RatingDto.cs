using System;
using Contracts.Domains;

namespace Models.Dtos
{
    public class RatingDto : DtoBase
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int SatisfiedCount { get; set; }
        public int HappyCount { get; set; }
        public int OkCount { get; set; }
        public int NotSatisfiedCount { get; set; }
        public int UnHappyCount { get; set; }
        public int TotalRating { get; set; }
    }
}
