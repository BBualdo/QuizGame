using System.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using QuizGame.Data.Models;
using QuizGame.Data.Models.MicrosoftDto;

namespace QuizGame.API.Controllers
{
    [Route("api/microsoft")]
    [ApiController]
    public class MicrosoftAuthController(IHttpClientFactory httpClientFactory, IConfiguration configuration, UserManager<User> userManager, SignInManager<User> signInManager) : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory = httpClientFactory;
        private readonly IConfiguration _configuration = configuration;
        private readonly UserManager<User> _userManager = userManager;
        private readonly SignInManager<User> _signInManager = signInManager;

        [HttpPost("sign-in")]
        public async Task<ActionResult> SignIn(MicrosoftAuthCodeDto authCodeDto)
        {
            var tokenResponse = await ExchangeCodeForToken(authCodeDto.Code);
            var userInfo = await GetUserInfo(tokenResponse.AccessToken);
            var user = await _userManager.FindByEmailAsync(userInfo.Email);

            if (user == null)
            {
                user = new User
                {
                    Email = userInfo.Email,
                    UserName = userInfo.Email
                };

                var result = await _userManager.CreateAsync(user);
                if (!result.Succeeded) return BadRequest(result.Errors);
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            var authToken = await _userManager.GenerateUserTokenAsync(user, TokenOptions.DefaultProvider, "Default");
            return Ok(new { token = authToken });
        }

        private async Task<MicrosoftTokenResponse> ExchangeCodeForToken(string code)
        {
            var client = _httpClientFactory.CreateClient();

            var basePath = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
            var queryParams = new Dictionary<string, string>()
            {
                {"client_id", _configuration["Authorization:Microsoft:ClientId"]},
                {"scope", "openid email offline_access"},
                {"code", code},
                {"redirect_uri", "http://localhost:4200/auth/signin-microsoft"},
                {"grant_type", "authorization_code"},
            };
            var request = new HttpRequestMessage(HttpMethod.Get, QueryHelpers.AddQueryString(basePath, queryParams));

            var response = await client.SendAsync(request);

            var content = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"Error: {response.StatusCode}, {response.ReasonPhrase}");
                Console.WriteLine($"Response: {content}");
            }

            return JsonConvert.DeserializeObject<MicrosoftTokenResponse>(content);
        }

        private async Task<MicrosoftUserInfo> GetUserInfo(string accessToken)
        {
            var client = _httpClientFactory.CreateClient();

            var request = new HttpRequestMessage(HttpMethod.Get, "https://graph.microsoft.com/v1.0/me");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await client.SendAsync(request);

            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<MicrosoftUserInfo>(content);
        }
    }
}
