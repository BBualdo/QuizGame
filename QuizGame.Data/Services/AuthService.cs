using QuizGame.Data.Models;
using QuizGame.Data.Services.DTO;

namespace QuizGame.Data.Services;

public class AuthService : IAuthService
{
    public Task<AuthOperationResult> GetCurrentUser()
    {
        throw new NotImplementedException();
    }

    public Task<AuthOperationResult> Register(RegisterModel registerModel)
    {
        throw new NotImplementedException();
    }

    public Task<AuthOperationResult> Login(LoginModel loginModel)
    {
        throw new NotImplementedException();
    }

    public Task<AuthOperationResult> Logout()
    {
        throw new NotImplementedException();
    }
}