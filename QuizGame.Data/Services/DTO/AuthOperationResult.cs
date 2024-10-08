﻿namespace QuizGame.Data.Services.DTO;

public class AuthOperationResult
{
    public bool IsSuccess { get; set; }
    public string? Message { get; set; }
    public string[]? Errors { get; set; }
}