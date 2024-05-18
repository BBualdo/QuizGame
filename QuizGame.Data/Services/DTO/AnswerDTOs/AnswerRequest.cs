namespace QuizGame.Data.Services.DTO.AnswerDTOs;

public class AnswerRequest
{
    public int AnswerId { get; set; }
    public string? Name { get; set; }
    public bool IsCorrect { get; set; }
    public int QuestionId { get; set; }
}