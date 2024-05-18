using QuizGame.Data.Services.DTO.AnswerDTOs;

namespace QuizGame.Data.Services.DTO.QuestionDTOs;

public class QuestionRequest
{
    public int QuestionId { get; set; }
    public string? Name { get; set; }
    public string? Difficulty { get; set; }
    public IEnumerable<AnswerRequest>? Answers { get; set; }
    public int QuizId { get; set; }
}