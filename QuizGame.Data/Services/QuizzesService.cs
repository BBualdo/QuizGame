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

    public async Task AddQuizAsync(QuizRequest quizRequest)
    {
        await _quizzesRepository.AddAsync(quizRequest.ToQuiz());
    }

    public async Task UpdateQuizAsync(QuizRequest quizRequest)
    {
        await _quizzesRepository.UpdateAsync(quizRequest.ToQuiz());
    }

    public async Task<bool> DeleteQuizAsync(int id)
    {
        Quiz? quiz = await _quizzesRepository.GetByIdAsync(id);
        if (quiz == null) return false;
        await _quizzesRepository.DeleteAsync(quiz);
        return true;
    }
}