using Microsoft.EntityFrameworkCore;
using QuizGame.Data.Models;

namespace QuizGame.Data;

public class QuizGameContext(DbContextOptions options) : DbContext(options)
{
  public DbSet<Quiz> Quizzes { get; set; }
  public DbSet<Question> Questions { get; set; }
  public DbSet<Answer> Answers { get; set; }
  public DbSet<Game> Games { get; set; }
  
  
}
