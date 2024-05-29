using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Services;
using QuizGame.Data.Services.DTO.GameDTOs;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GamesController(IGamesService gamesService) : ControllerBase
{
    private readonly IGamesService _gamesService = gamesService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<GameResponse>>> GetGames(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 5)
    {
        var paginatedGames = await _gamesService.GetGamesAsync(page, pageSize);
        if (paginatedGames.Games.Any() && page > paginatedGames.Total) return NotFound("Page doesn't exist");
        return Ok(paginatedGames);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult> AddGame(GameRequest gameRequest)
    {
        await _gamesService.AddGameAsync(gameRequest);
        return CreatedAtAction(nameof(AddGame), gameRequest);
    }

    [HttpDelete("{id:int}")]
    [Authorize]
    public async Task<ActionResult> DeleteGame(int id)
    {
        var isDeleted = await _gamesService.DeleteGameAsync(id);
        if (!isDeleted) return NotFound("No game to delete.");
        return NoContent();
    }

    [HttpDelete]
    [Authorize]
    public async Task<ActionResult> DeleteAllGames()
    {
        var areDeleted = await _gamesService.DeleteAllGamesAsync();
        if (!areDeleted) return NotFound("No games to delete.");
        return NoContent();
    }
}