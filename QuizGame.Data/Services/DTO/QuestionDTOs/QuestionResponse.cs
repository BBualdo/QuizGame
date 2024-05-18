using QuizGame.Data.Models;
using QuizGame.Data.Services.DTO.AnswerDTOs;

namespace QuizGame.Data.Services.DTO.QuestionDTOs;

public class QuestionResponse
{
    public string? Name { get; set; }
    public string? Difficulty { get; set; }
    public IEnumerable<AnswerResponse>? Answers { get; set; }
}

public static class QuestionExtensions
{
    public static QuestionResponse ToQuestionResponse(this Question question)
    {
        return new QuestionResponse
        {
            Name = question.Name,
            Difficulty = question.Difficulty,
            Answers = question.Answers?.Select(answer => answer.ToAnswerResponse())
        };
    }
}