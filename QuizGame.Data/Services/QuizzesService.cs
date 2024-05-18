using QuizGame.Data.Models;
using QuizGame.Data.Repositories;
using QuizGame.Data.Services.DTO.QuizDTOs;

namespace QuizGame.Data.Services;

public class QuizzesService(IRepository<Quiz> quizzesRepository) : IQuizzesService
{
    private readonly IRepository<Quiz> _quizzesRepository = quizzesRepository;


    public async Task<IEnumerable<QuizResponse>> GetQuizzesAsync()
    {
        var quizzes = await _quizzesRepository.GetAsync();
        return quizzes.Select(quiz => quiz.ToQuizResponse());
    }

    public Task AddQuizAsync()
    {
        throw new NotImplementedException();
    }

    public Task UpdateQuizAsync()
    {
        throw new NotImplementedException();
    }

    public Task DeleteQuizAsync()
    {
        throw new NotImplementedException();
    }
}