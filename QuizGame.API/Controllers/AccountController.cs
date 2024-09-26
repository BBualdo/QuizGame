using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using QuizGame.Data.Models;
using QuizGame.Data.Services;

namespace QuizGame.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(SignInManager<User> signInManager, UserManager<User> userManager, IAuthService authService) : ControllerBase
    {
        private readonly SignInManager<User> _signInManager = signInManager;
        private readonly UserManager<User> _userManager = userManager;
        private readonly IAuthService _authService = authService;

        [HttpGet("currentUser")]
        public async Task<ActionResult> GetCurrentUser()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return NoContent();
            return Ok(new
            {
                userId = user.Id,
                username = user.UserName,
                email = user.Email
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterModel model)
        {
            var result = await _authService.Register(model);
            if (!result.IsSuccess) return BadRequest(new {message = result.Message, errors = result.Errors});
            return Ok(new { message = result.Message });
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login(LoginModel model)
        {
            var result = await _authService.Login(model);
            if (!result.IsSuccess) return BadRequest(new { message = result.Message, errors = result.Errors });
            return Ok(new { message = result.Message });
        }

        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logout successful.");
        }
    }
}
