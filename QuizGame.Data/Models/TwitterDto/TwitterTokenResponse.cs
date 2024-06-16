using Newtonsoft.Json;

namespace QuizGame.Data.Models;

public class TwitterTokenResponse
{
    [JsonProperty("access_token")]
    public string? AccessToken { get; set; }
}