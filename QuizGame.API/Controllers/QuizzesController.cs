using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Models;
using QuizGame.Data.Services;
using QuizGame.Data.Services.DTO.QuizDTOs;

namespace QuizGame.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class QuizzesController(IQuizzesService quizzesService) : ControllerBase
{
    private readonly IQuizzesService _quizzesService = quizzesService;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<QuizResponse>>> GetQuizzes()
    {
        IEnumerable<QuizResponse> quizzes = await _quizzesService.GetQuizzesAsync();
        return Ok(quizzes);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<QuizDetailsResponse>> GetQuizById(int id)
    {
        QuizDetailsResponse? quiz = await _quizzesService.GetQuizByIdAsync(id);
        if (quiz == null) return NotFound("Quiz not found.");
        return Ok(quiz);
    }

    [HttpPost]
    public async Task<ActionResult> AddQuiz(QuizRequest quizRequest)
    {
        await _quizzesService.AddQuizAsync(quizRequest);
        return CreatedAtAction(nameof(AddQuiz), quizRequest);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdateQuiz(int id, QuizRequest quizRequest)
    {
        if (id != quizRequest.QuizId) return NotFound();
        await _quizzesService.UpdateQuizAsync(quizRequest);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteQuiz(int id)
    {
        await _quizzesService.DeleteQuizAsync(id);
        return NoContent();
    }
}