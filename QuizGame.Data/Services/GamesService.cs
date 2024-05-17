using QuizGame.Data.Models;
using QuizGame.Data.Repositories;
using QuizGame.Data.Services.DTO;

namespace QuizGame.Data.Services;

public class GamesService : IGamesService
{
  private readonly IRepository<Game> _gamesRepository;

  public GamesService(IRepository<Game> gamesRepository)
  {
    _gamesRepository = gamesRepository;
  }

  public async Task AddGameAsync(GameDTO gameDTO)
  {
    await _gamesRepository.AddAsync(gameDTO.ToGame());
  }

  public async Task<bool> DeleteAllGamesAsync()
  {
    IEnumerable<Game> games = await _gamesRepository.GetAllAsync();
    if (!games.Any()) return false;
    await _gamesRepository.DeleteAllAsync(games);
    return true;
  }

  public async Task<bool> DeleteGameAsync(int id)
  {
    Game? game = await _gamesRepository.GetByIdAsync(id);
    if (game == null) return false;
    await _gamesRepository.DeleteAsync(game);
    return true;
  }

  public async Task<IEnumerable<GameDTO>> GetAllGamesAsync()
  {
    IEnumerable<Game> games = await _gamesRepository.GetAllAsync();
    return games.Select(game => game.ToDTO());
  }
}
