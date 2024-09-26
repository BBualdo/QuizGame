using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using QuizGame.Data.Models;
using QuizGame.Data.Services.DTO;

namespace QuizGame.Data.Services;

public class AuthService(UserManager<User> userManager, SignInManager<User> signInManager, ILogger logger) : IAuthService
{
    private readonly UserManager<User> _userManager = userManager;
    private readonly SignInManager<User> _signInManager = signInManager;
    private readonly ILogger _logger = logger;
    
    public async Task<AuthOperationResult> Register(RegisterModel registerModel)
    {
        var user = new User
        {
            UserName = registerModel.UserName,
            Email = registerModel.Email,
        };

        var result = await _userManager.CreateAsync(user, registerModel.Password);
        if (result.Succeeded)
        {
            await _signInManager.SignInAsync(user, isPersistent: false);
            return new AuthOperationResult
            {
                IsSuccess = true,
                Message = "Registration successful"
            };
        }
        
        _logger.LogError($"{user.UserName} failed at registering attempt.");
        return new AuthOperationResult
        {
            IsSuccess = false,
            Message = "Register attempt failed.",
            Errors = result.Errors.Select(e => e.Description).ToArray()
        };
    }

    public async Task<AuthOperationResult> Login(LoginModel loginModel)
    {
        var user = await _userManager.FindByNameAsync(loginModel.UserName);
        if (user == null)
        {
            _logger.LogError($"{loginModel.UserName} failed at logging in attempt.");
            return new AuthOperationResult
            {
                IsSuccess = false,
                Message = "Login attempt failed.",
                Errors = ["User doesn't exist."]
            };
        }

        var result = await _signInManager.PasswordSignInAsync(user, loginModel.Password, isPersistent: false,
            lockoutOnFailure: false);

        if (result.Succeeded)
        {
            return new AuthOperationResult
            {
                IsSuccess = true,
                Message = "Login successful."
            };
        }
        _logger.LogError($"{user.UserName} tried to log in with invalid password.");
        return new AuthOperationResult
        {
            IsSuccess = false,
            Message = "Login attempt failed.",
            Errors = ["Invalid password."]
        };
    }
}