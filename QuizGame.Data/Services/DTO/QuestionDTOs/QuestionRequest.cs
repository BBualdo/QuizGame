using QuizGame.Data.Models;
using QuizGame.Data.Services.DTO.AnswerDTOs;

namespace QuizGame.Data.Services.DTO.QuestionDTOs;

public class QuestionRequest
{
    public int QuestionId { get; set; }
    public string? Name { get; set; }
    public string? Difficulty { get; set; }
    public ICollection<AnswerRequest> Answers { get; set; } = new List<AnswerRequest>();
    public int QuizId { get; set; }

    public Question ToQuestion()
    {
        return new Question
        {
            QuestionId = QuestionId,
            Name = Name,
            Difficulty = Difficulty,
            Answers = Answers.Select(answer => answer.ToAnswer()).ToList(),
            QuizId = QuizId
        };
    }
}