using QuizGame.Data.Models.DTO;

namespace QuizGame.API.Services;

public interface IGamesService
{
  Task<IEnumerable<GameDTO>> GetAllGamesAsync();
  Task AddGameAsync(GameDTO gameDTO);
  Task<bool> DeleteGameAsync(int id);
  Task<bool> DeleteAllGamesAsync();
}
