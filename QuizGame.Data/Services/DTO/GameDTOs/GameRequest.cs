using QuizGame.Data.Models;

namespace QuizGame.Data.Services.DTO.GameDTOs;

public class GameRequest
{
    public int GameId { get; set; }
    public string? Username { get; set; }
    public DateTime Date { get; set; }
    public int Score { get; set; }
    public int QuizId { get; set; }
}

public static class GameRequestExtensions
{
    public static Game ToGame(this GameRequest gameRequest)
    {
        return new ()
        {
            GameId = gameRequest.GameId,
            Username = gameRequest.Username,
            Date = gameRequest.Date,
            Score = gameRequest.Score,
            QuizId = gameRequest.QuizId
        };
    }
}