using QuizGame.Data.Models;
using QuizGame.Data.Services.DTO;

namespace QuizGame.Data.Services;

public interface IAuthService
{
    Task<AuthOperationResult> Register(RegisterModel registerModel);
    Task<AuthOperationResult> Login(LoginModel loginModel);
}