namespace QuizGame.Data.Services.DTO.GameDTOs;

public class GameResponse
{
  public string? Username { get; set; }
  public DateTime Date { get; set; }
  public int Score { get; set; }
  public string? QuizName { get; set; }
}