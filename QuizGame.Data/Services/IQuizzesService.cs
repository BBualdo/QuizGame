using QuizGame.Data.Services.DTO.QuizDTOs;

namespace QuizGame.Data.Services;

public interface IQuizzesService
{
    Task<IEnumerable<QuizResponse>> GetQuizzesAsync();
    Task AddQuizAsync(QuizRequest quizRequest);
    Task UpdateQuizAsync(QuizRequest quizRequest);
    Task<bool> DeleteQuizAsync(int id);
}