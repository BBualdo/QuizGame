using QuizGame.Data.Services.DTO.QuestionDTOs;

namespace QuizGame.Data.Services.DTO.QuizDTOs;

public class QuizResponse
{
    public int QuizId { get; set; }
    public string? Name { get; set; }
    public IEnumerable<QuestionResponse>? Questions { get; set; }
}