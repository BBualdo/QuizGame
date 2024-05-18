using QuizGame.Data.Models;

namespace QuizGame.Data.Services.DTO.GameDTOs;

public class GameResponse
{
    public string? Username { get; set; }
    public DateTime Date { get; set; }
    public int Score { get; set; }
    public string? QuizName { get; set; }
}

public static class GameExtensions
{
    public static GameResponse ToGameResponse(this Game game)
    {
        return new GameResponse
        {
            Username = game.Username,
            Date = game.Date,
            Score = game.Score,
            QuizName = game.Quiz?.Name
        };
    }
}