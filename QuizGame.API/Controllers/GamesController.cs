using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Models;
using QuizGame.Data.Repositories;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GamesController : ControllerBase
{
  private readonly IRepository<Game> _gamesRepository;

  public GamesController(IRepository<Game> gamesRepository)
  {
    _gamesRepository = gamesRepository;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Game>>> GetAllGames()
  {
    IEnumerable<Game> games = await _gamesRepository.GetAllAsync();
    return Ok(games);
  }

  [HttpPost]
  public async Task<ActionResult> AddGame(Game game)
  {
    if (game == null) return BadRequest();

    await _gamesRepository.AddAsync(game);
    return CreatedAtAction(nameof(AddGame), game);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteGame(int id)
  {
    Game? game = await _gamesRepository.GetByIdAsync(id);
    if (game == null) return NotFound();

    await _gamesRepository.DeleteAsync(game);
    return NoContent();
  }

  [HttpDelete]
  public async Task<ActionResult> DeleteAllGames()
  {
    IEnumerable<Game> games = await _gamesRepository.GetAllAsync();
    await _gamesRepository.DeleteAllAsync(games);
    return NoContent();
  }
}
