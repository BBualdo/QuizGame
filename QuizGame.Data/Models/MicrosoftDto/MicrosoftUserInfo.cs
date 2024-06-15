﻿using Newtonsoft.Json;

namespace QuizGame.Data.Models.MicrosoftDto;

public class MicrosoftUserInfo
{
    [JsonProperty("mail")]
    public string? Email { get; set; }
}