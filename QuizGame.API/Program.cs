using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuizGame.Data;
using QuizGame.Data.Models;
using QuizGame.Data.Repositories;
using QuizGame.Data.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddAuthentication();

builder.Services.AddDbContext<QuizGameContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default"));
});
builder.Services.AddIdentityCore<IdentityUser>()
                .AddEntityFrameworkStores<QuizGameContext>();

builder.Services.AddScoped<IQuizzesRepository, QuizzesRepository>();
builder.Services.AddScoped<IRepository<Question>, Repository<Question>>();
builder.Services.AddScoped<IRepository<Answer>, Repository<Answer>>();
builder.Services.AddScoped<IGamesRepository, GamesRepository>();

builder.Services.AddScoped<IGamesService, GamesService>();
builder.Services.AddScoped<IQuizzesService, QuizzesService>();

builder.Services.AddIdentityApiEndpoints<IdentityUser>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapIdentityApi<IdentityUser>();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.MapControllers();

app.Run();