using QuizGame.Data.Models;

namespace QuizGame.Data.Services;

public interface IErrorsService
{
    public Task AddErrorAsync(Error error);
}