namespace QuizGame.Data.Services.DTO;

public class AuthOperationResult
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public string? Message { get; set; }
    public string[]? Errors { get; set; }
}