using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Models;
using QuizGame.Data.Repositories;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuizzesController : ControllerBase
{
  private readonly IRepository<Quiz> _quizzesRepository;

  public QuizzesController(IRepository<Quiz> quizzesRepository)
  {
    _quizzesRepository = quizzesRepository;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Quiz>>> GetAllQuizzes()
  {
    IEnumerable<Quiz> quizzes = await _quizzesRepository.GetAsync();
    return Ok(quizzes);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Quiz>> GetQuizById(int id)
  {
    Quiz? quiz = await _quizzesRepository.GetByIdAsync(id);
    if (quiz == null) return NotFound();
    return Ok(quiz);
  }

  [HttpPost]
  public async Task<ActionResult> AddQuiz(Quiz quiz)
  {
    if (quiz == null) return BadRequest();
    await _quizzesRepository.AddAsync(quiz);
    return CreatedAtAction(nameof(AddQuiz), quiz);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateQuiz(int id, Quiz quiz)
  {
    if (quiz.QuizId != id) return NotFound();
    if (quiz == null) return BadRequest();
    await _quizzesRepository.UpdateAsync(quiz);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteQuiz(int id)
  {
    Quiz? quiz = await _quizzesRepository.GetByIdAsync(id);
    if (quiz == null) return NotFound();
    await _quizzesRepository.DeleteAsync(quiz);
    return NoContent();
  }
}
