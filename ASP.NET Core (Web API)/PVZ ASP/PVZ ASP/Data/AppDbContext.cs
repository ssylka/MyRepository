namespace PVZ_ASP.Data
{
    using Microsoft.EntityFrameworkCore;
    using PVZ_ASP.Models;


    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<PullRequest> PullRequests { get; set; }
        public DbSet<PullRequestReviewer> PullRequestReviewers { get; set; }
        
        public AppDbContext(DbContextOptions<AppDbContext> options) // конструктор, который принимает настройки для подключения к БД
            : base(options)
        {

        }

        //DbContextOptions — это как набор параметров подключения и поведения БД:
        //какая БД(PostgreSQL)
        //строка подключения
        //включено ли логирование
        //ленивые/жадные загрузки
        //и т.д.
        //dotnet ef migrations add AddTeams
        //dotnet ef database update

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<PullRequestReviewer>()
                .HasKey(x => new { x.PullRequestId, x.ReviewerId });
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Team)
                .WithMany(t => t.Users)
                .HasForeignKey(u => u.TeamId);

            modelBuilder.Entity<PullRequest>()
                .HasOne(p => p.Author)
                .WithMany()
                .HasForeignKey(p => p.AuthorId);
        }
    }
}
