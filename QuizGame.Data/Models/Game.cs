using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QuizGame.Data.Services.DTO.GameDTOs;

namespace QuizGame.Data.Models;

public class Game
{
  [Key]
  public int GameId { get; set; }

  [Required]
  [StringLength(50)]
  public string? Username { get; set; }

  [Required]
  public DateTime Date { get; set; }

  [Required]
  public int Score { get; set; }

  public int QuizId { get; set; }

  [ForeignKey(nameof(QuizId))]
  public Quiz? Quiz { get; set; }


  public GameResponse ToGameResponse()
  {
    return new()
    {
      Username = Username,
      Date = Date,
      Score = Score,
      QuizName = Quiz?.Name,
    };
  }
}
