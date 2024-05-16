using QuizGame.Data.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizGame.Data.Models;

public class Question
{
  [Key]
  public int QuestionId { get; set; }

  [Required]
  [StringLength(200)]
  public string? Name { get; set; }

  [Required]
  public DifficultyLevels Difficulty { get; set; }

  public IEnumerable<Answer>? Answers { get; set; }

  public int QuizId { get; set; }

  [ForeignKey(nameof(QuizId))]
  public Quiz? Quiz { get; set; }
}
