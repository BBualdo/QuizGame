using QuizGame.Data.Models;
using QuizGame.Data.Repositories;
using QuizGame.Data.Services.DTO.GameDTOs;

namespace QuizGame.Data.Services;

public class GamesService : IGamesService
{
  private readonly IGamesRepository _gamesRepository;

  public GamesService(IGamesRepository gamesRepository)
  {
    _gamesRepository = gamesRepository;
  }

  public async Task AddGameAsync(GameRequest gameRequest)
  {
    await _gamesRepository.AddAsync(gameRequest.ToGame());
  }

  public async Task<bool> DeleteAllGamesAsync()
  {
    IEnumerable<Game> games = await _gamesRepository.GetAsync();
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

  public async Task<IEnumerable<GameResponse>> GetGamesAsync()
  {
    IEnumerable<Game> games = await _gamesRepository.GetGamesWithQuizzesAsync();
    return games.Select(game => game.ToGameResponse());
  }
}
