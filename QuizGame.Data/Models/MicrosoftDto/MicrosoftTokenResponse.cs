using Newtonsoft.Json;

namespace QuizGame.Data.Models.MicrosoftDto;

public class MicrosoftTokenResponse
{
    [JsonProperty("access_token")]
    public string? AccessToken { get; set; }
}