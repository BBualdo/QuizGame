using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Models;
using QuizGame.Data.Repositories;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AnswersController : ControllerBase
{
  private readonly IRepository<Answer> _answersRepository;

  public AnswersController(IRepository<Answer> answersRepository)
  {
    _answersRepository = answersRepository;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Answer>>> GetAllAnswers()
  {
    IEnumerable<Answer> answers = await _answersRepository.GetAsync();
    return Ok(answers);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Answer>> GetAnswerById(int id)
  {
    Answer? answer = await _answersRepository.GetByIdAsync(id);
    if (answer == null) return NotFound();
    return Ok(answer);
  }

  [HttpPost]
  public async Task<ActionResult> AddAnswer(Answer answer)
  {
    if (answer == null) return BadRequest();
    await _answersRepository.AddAsync(answer);
    return CreatedAtAction(nameof(AddAnswer), answer);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateAnswer(int id, Answer answer)
  {
    if (answer.AnswerId != id) return NotFound();
    if (answer == null) return BadRequest();
    await _answersRepository.UpdateAsync(answer);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteAnswer(int id)
  {
    Answer? answer = await _answersRepository.GetByIdAsync(id);
    if (answer == null) return NotFound();
    await _answersRepository.DeleteAsync(answer);
    return NoContent();
  }
}
