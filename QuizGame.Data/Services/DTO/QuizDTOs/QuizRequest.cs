using QuizGame.Data.Services.DTO.QuestionDTOs;

namespace QuizGame.Data.Services.DTO.QuizDTOs;

public class QuizRequest
{
    public int QuizId { get; set; }
    public string? Name { get; set; }
    public IEnumerable<QuestionRequest>? Questions { get; set; }
}