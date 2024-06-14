using Newtonsoft.Json;

namespace QuizGame.Data.Models;

public class GoogleTokenResponse
{
    [JsonProperty("access_token")]
    public string? AccessToken { get; set; }
}