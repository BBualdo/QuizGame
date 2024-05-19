using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace QuizGame.Data.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Quizzes",
                columns: table => new
                {
                    QuizId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Quizzes", x => x.QuizId);
                });

            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    GameId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Score = table.Column<int>(type: "integer", nullable: false),
                    QuizId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.GameId);
                    table.ForeignKey(
                        name: "FK_Games_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "QuizId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    QuestionId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Difficulty = table.Column<string>(type: "character varying(6)", maxLength: 6, nullable: false),
                    QuizId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.QuestionId);
                    table.ForeignKey(
                        name: "FK_Questions_Quizzes_QuizId",
                        column: x => x.QuizId,
                        principalTable: "Quizzes",
                        principalColumn: "QuizId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    AnswerId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    IsCorrect = table.Column<bool>(type: "boolean", nullable: false),
                    QuestionId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.AnswerId);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "QuestionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Quizzes",
                columns: new[] { "QuizId", "Name" },
                values: new object[,]
                {
                    { 1, "General Knowledge" },
                    { 2, "Science" },
                    { 3, "History" },
                    { 4, "Geography" },
                    { 5, "Math" }
                });

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "QuestionId", "Difficulty", "Name", "QuizId" },
                values: new object[,]
                {
                    { 1, "Easy", "What is the capital of France?", 1 },
                    { 2, "Medium", "Who wrote 'To Kill a Mockingbird'?", 1 },
                    { 3, "Easy", "Which planet is known as the Red Planet?", 1 },
                    { 4, "Medium", "What is the largest mammal in the world?", 1 },
                    { 5, "Hard", "What is the smallest country in the world?", 1 },
                    { 6, "Easy", "What is the chemical symbol for water?", 2 },
                    { 7, "Medium", "Who developed the theory of relativity?", 2 },
                    { 8, "Easy", "What is the powerhouse of the cell?", 2 },
                    { 9, "Easy", "What planet is known as the Red Planet?", 2 },
                    { 10, "Hard", "What is the speed of light?", 2 },
                    { 11, "Easy", "Who was the first President of the United States?", 3 },
                    { 12, "Medium", "In which year did the Titanic sink?", 3 },
                    { 13, "Easy", "Who discovered America?", 3 },
                    { 14, "Medium", "What was the name of the first man on the moon?", 3 },
                    { 15, "Hard", "Which war was fought between the north and south regions in the United States?", 3 },
                    { 16, "Medium", "What is the longest river in the world?", 4 },
                    { 17, "Easy", "Which continent is the largest?", 4 },
                    { 18, "Medium", "Which country has the most population?", 4 },
                    { 19, "Easy", "What is the smallest continent?", 4 },
                    { 20, "Hard", "Which country has the most number of islands?", 4 },
                    { 21, "Medium", "What is the value of Pi?", 5 },
                    { 22, "Easy", "What is 2+2?", 5 },
                    { 23, "Easy", "What is the square root of 16?", 5 },
                    { 24, "Hard", "What is the value of the gravitational constant?", 5 },
                    { 25, "Medium", "What is the derivative of x^2?", 5 }
                });

            migrationBuilder.InsertData(
                table: "Answers",
                columns: new[] { "AnswerId", "IsCorrect", "Name", "QuestionId" },
                values: new object[,]
                {
                    { 1, true, "Paris", 1 },
                    { 2, false, "London", 1 },
                    { 3, false, "Berlin", 1 },
                    { 4, false, "Madrid", 1 },
                    { 5, true, "Harper Lee", 2 },
                    { 6, false, "Jane Austen", 2 },
                    { 7, false, "Mark Twain", 2 },
                    { 8, false, "Ernest Hemingway", 2 },
                    { 9, true, "Mars", 3 },
                    { 10, false, "Venus", 3 },
                    { 11, false, "Jupiter", 3 },
                    { 12, false, "Saturn", 3 },
                    { 13, true, "Blue Whale", 4 },
                    { 14, false, "Elephant", 4 },
                    { 15, false, "Giraffe", 4 },
                    { 16, false, "Whale Shark", 4 },
                    { 17, true, "Vatican City", 5 },
                    { 18, false, "Monaco", 5 },
                    { 19, false, "Nauru", 5 },
                    { 20, false, "San Marino", 5 },
                    { 21, true, "H2O", 6 },
                    { 22, false, "O2", 6 },
                    { 23, false, "CO2", 6 },
                    { 24, false, "N2", 6 },
                    { 25, true, "Albert Einstein", 7 },
                    { 26, false, "Isaac Newton", 7 },
                    { 27, false, "Galileo Galilei", 7 },
                    { 28, false, "Nikola Tesla", 7 },
                    { 29, true, "Mitochondria", 8 },
                    { 30, false, "Nucleus", 8 },
                    { 31, false, "Ribosome", 8 },
                    { 32, false, "Endoplasmic Reticulum", 8 },
                    { 33, true, "299,792,458 m/s", 10 },
                    { 34, false, "150,000,000 m/s", 10 },
                    { 35, false, "1,080,000,000 km/h", 10 },
                    { 36, false, "100,000 km/s", 10 },
                    { 37, true, "George Washington", 11 },
                    { 38, false, "Thomas Jefferson", 11 },
                    { 39, false, "Abraham Lincoln", 11 },
                    { 40, false, "John Adams", 11 },
                    { 41, true, "1912", 12 },
                    { 42, false, "1905", 12 },
                    { 43, false, "1898", 12 },
                    { 44, false, "1920", 12 },
                    { 45, true, "Christopher Columbus", 13 },
                    { 46, false, "Ferdinand Magellan", 13 },
                    { 47, false, "Marco Polo", 13 },
                    { 48, false, "James Cook", 13 },
                    { 49, true, "Neil Armstrong", 14 },
                    { 50, false, "Buzz Aldrin", 14 },
                    { 51, false, "Yuri Gagarin", 14 },
                    { 52, false, "Michael Collins", 14 },
                    { 53, true, "American Civil War", 15 },
                    { 54, false, "World War I", 15 },
                    { 55, false, "World War II", 15 },
                    { 56, false, "Spanish-American War", 15 },
                    { 57, true, "Nile River", 16 },
                    { 58, false, "Amazon River", 16 },
                    { 59, false, "Yangtze River", 16 },
                    { 60, false, "Mississippi River", 16 },
                    { 61, true, "Asia", 17 },
                    { 62, false, "Africa", 17 },
                    { 63, false, "North America", 17 },
                    { 64, false, "Europe", 17 },
                    { 65, true, "China", 18 },
                    { 66, false, "India", 18 },
                    { 67, false, "USA", 18 },
                    { 68, false, "Indonesia", 18 },
                    { 69, true, "Australia", 19 },
                    { 70, false, "Europe", 19 },
                    { 71, false, "South America", 19 },
                    { 72, false, "Antarctica", 19 },
                    { 73, true, "Sweden", 20 },
                    { 74, false, "Finland", 20 },
                    { 75, false, "Norway", 20 },
                    { 76, false, "Canada", 20 },
                    { 77, true, "3.14", 21 },
                    { 78, false, "2.71", 21 },
                    { 79, false, "1.62", 21 },
                    { 80, false, "0", 21 },
                    { 81, true, "4", 22 },
                    { 82, false, "3", 22 },
                    { 83, false, "5", 22 },
                    { 84, false, "6", 22 },
                    { 85, true, "4", 23 },
                    { 86, false, "5", 23 },
                    { 87, false, "6", 23 },
                    { 88, false, "7", 23 },
                    { 89, true, "9.8 m/s^2", 24 },
                    { 90, false, "3.14 m/s^2", 24 },
                    { 91, false, "2.71 m/s^2", 24 },
                    { 92, false, "1.62 m/s^2", 24 },
                    { 93, true, "2x", 25 },
                    { 94, false, "x^2", 25 },
                    { 95, false, "1/x", 25 },
                    { 96, false, "x", 25 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Games_QuizId",
                table: "Games",
                column: "QuizId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_QuizId",
                table: "Questions",
                column: "QuizId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Quizzes");
        }
    }
}
