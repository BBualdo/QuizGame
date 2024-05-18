using QuizGame.Data.Services.DTO.AnswerDTOs;

namespace QuizGame.Data.Services.DTO.QuestionDTOs;

public class QuestionResponse
{
    public string? Name { get; set; }
    public string? Difficulty { get; set; }
    public IEnumerable<AnswerResponse>? Answers { get; set; }
}