using QuizGame.Data.Services.DTO.QuizDTOs;

namespace QuizGame.Data.Services;

public interface IQuizzesService
{
    Task<IEnumerable<QuizResponse>> GetQuizzesAsync();
    Task AddQuizAsync();
    Task UpdateQuizAsync();
    Task DeleteQuizAsync();
}