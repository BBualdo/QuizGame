namespace QuizGame.Data.Models.DTO;

public class GameDTO
{
  public string? Username { get; set; }
  public DateTime Date { get; set; }
  public int Score { get; set; }
  public int QuizId { get; set; }
}

public static class GameDTOExtensions
{
  public static Game ToGame(this GameDTO gameDTO)
  {
    return new()
    {
      Username = gameDTO.Username,
      Date = gameDTO.Date,
      Score = gameDTO.Score,
      QuizId = gameDTO.QuizId
    };
  }
}
