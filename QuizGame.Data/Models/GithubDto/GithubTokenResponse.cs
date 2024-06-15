using Newtonsoft.Json;

namespace QuizGame.Data.Models.Github;

public class GithubTokenResponse
{
    [JsonProperty("access_token")]
    public string? AccessToken { get; set; }
}