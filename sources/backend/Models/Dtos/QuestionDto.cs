using Common.Enums;
using Contracts.Domains;

namespace Models.Dtos
{
    public class QuestionDto : DtoBase
    {
        public string Title { get; set; }
        public string? AskedPersonName { get; set; }
        public string? Department { get; set; }
        public string? Address { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public bool IsNoticed { get; set; }
        public string? QuestionContent { get; set; }
        public string? AnswerContent { get; set; }
        public QuestionStatus? QuestionStatus { get; set; }
        public string? AnswerPersonName { get; set; }
        public DateTime? AnswerDate { get; set; }
        public DateTime? QuestionDate { get; set; }
        public int Views { get; set; }
        public QuestionCategoryDto? QuestionCategory { get; set; }
    }
}