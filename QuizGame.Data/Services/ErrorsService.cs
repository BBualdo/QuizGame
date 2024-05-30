using QuizGame.Data.Models;

namespace QuizGame.Data.Services;

public class ErrorsService(QuizGameContext quizGameContext) : IErrorsService
{
    private readonly QuizGameContext _quizGameContext = quizGameContext;

    public async Task AddErrorAsync(Error error)
    {
        await _quizGameContext.Errors.AddAsync(error);
        await _quizGameContext.SaveChangesAsync();
    }
}