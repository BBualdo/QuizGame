using Microsoft.AspNetCore.Mvc;
using QuizGame.API.Services;
using QuizGame.Data.Models.DTO;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GamesController : ControllerBase
{
  private readonly IGamesService _gamesService;

  public GamesController(IGamesService gamesService)
  {
    _gamesService = gamesService;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<GameDTO>>> GetAllGames()
  {
    IEnumerable<GameDTO> games = await _gamesService.GetAllGamesAsync();
    return Ok(games);
  }

  [HttpPost]
  public async Task<ActionResult> AddGame(GameDTO gameDTO)
  {
    if (gameDTO == null) return BadRequest("No game to add.");
    await _gamesService.AddGameAsync(gameDTO);
    return CreatedAtAction(nameof(AddGame), gameDTO);
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteGame(int id)
  {
    bool isDeleted = await _gamesService.DeleteGameAsync(id);
    if (!isDeleted) return NotFound("No game to delete.");
    return NoContent();
  }

  [HttpDelete]
  public async Task<ActionResult> DeleteAllGames()
  {
    bool areDeleted = await _gamesService.DeleteAllGamesAsync();
    if (!areDeleted) return NotFound("No games to delete.");
    return NoContent();
  }
}
