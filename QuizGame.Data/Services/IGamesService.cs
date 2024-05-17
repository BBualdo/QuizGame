using QuizGame.Data.Services.DTO;

namespace QuizGame.Data.Services;

public interface IGamesService
{
  Task<IEnumerable<GameDTO>> GetGamesAsync();
  Task AddGameAsync(GameDTO gameDTO);
  Task<bool> DeleteGameAsync(int id);
  Task<bool> DeleteAllGamesAsync();
}
