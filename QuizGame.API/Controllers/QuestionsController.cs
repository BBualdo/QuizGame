using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Models;
using QuizGame.Data.Repositories;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuestionsController : ControllerBase
{
  private readonly IRepository<Question> _questionsRepository;

  public QuestionsController(IRepository<Question> questionsRepository)
  {
    _questionsRepository = questionsRepository;
  }

  [HttpGet]
  public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestions()
  {
    IEnumerable<Question> questions = await _questionsRepository.GetAsync();
    return Ok(questions);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Question>> GetQuestionById(int id)
  {
    Question? question = await _questionsRepository.GetByIdAsync(id);
    if (question == null) return NotFound();
    return Ok(question);
  }

  [HttpPost]
  public async Task<ActionResult> AddQuestion(Question question)
  {
    if (question == null) return BadRequest();
    await _questionsRepository.AddAsync(question);
    return CreatedAtAction(nameof(AddQuestion), question);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateQuestion(int id, Question question)
  {
    if (question.QuestionId != id) return NotFound();
    if (question == null) return BadRequest();
    await _questionsRepository.UpdateAsync(question);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteQuestion(int id)
  {
    Question? question = await _questionsRepository.GetByIdAsync(id);
    if (question == null) return NotFound();
    await _questionsRepository.DeleteAsync(question);
    return NoContent();
  }
}
