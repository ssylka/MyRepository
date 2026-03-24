using Microsoft.EntityFrameworkCore; // Добавьте эту строку
using Npgsql.EntityFrameworkCore.PostgreSQL;
using PVZ_ASP.Data;
using PVZ_ASP.Services;
using Swashbuckle.AspNetCore.SwaggerGen; // Добавьте эту строку

namespace PVZ_ASP
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            // Add services to the container.

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy.AllowAnyOrigin()
                                    .AllowAnyMethod()
                                    .AllowAnyHeader());
            }); // Разрешаем CORS для всех источников, методов и заголовков
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowSpecificOrigin",
            //        policy => policy.WithOrigins("http://localhost:3000") // Разрешаем только с этого адреса
            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))); // Замените "DefaultConnection" на имя вашей строки подключения в appsettings.json
            builder.Services.AddScoped<PullRequestService>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy => policy
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            }); // Разрешаем CORS для всех источников, методов и заголовков

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }
            app.UseCors("AllowAll");

            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();
            app.Run();
        }
    }
}
