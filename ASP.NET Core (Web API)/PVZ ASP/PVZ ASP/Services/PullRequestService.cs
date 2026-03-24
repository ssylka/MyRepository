using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVZ_ASP.Data;
using PVZ_ASP.Models;
using PVZ_ASP.Models.Dto;

namespace PVZ_ASP.Services
{
    public class PullRequestService : ControllerBase
    {
        private readonly AppDbContext _context;

        public PullRequestService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PullRequest> CreatePR(CreatePullRequestDto dto)
        {
            var exists = await _context.PullRequests
            .AnyAsync(pr => pr.Id == dto.PullRequestId);

            if (exists)
                throw new Exception("PR_EXISTS");


            var author = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == dto.AuthorId);

            if (author == null)
                throw new Exception("Author not found");

            var candidates = await _context.Users
                .Where(u => u.IsActive && u.Id != dto.AuthorId && u.TeamId == author.TeamId)
                .ToListAsync();

            var reviewers = candidates
                .OrderBy(_ => Guid.NewGuid())
                .Take(2)
                .ToList();

            var pr = new PullRequest
            {
                Id = dto.PullRequestId,
                Title = dto.PullRequestName,
                AuthorId = dto.AuthorId,
                Status = PRStatus.OPEN,
                CreatedAt = DateTime.UtcNow
            };

            pr.Reviewers = reviewers.Select(r => new PullRequestReviewer
            {
                PullRequestId = pr.Id,
                ReviewerId = r.Id
            }).ToList();

            _context.PullRequests.Add(pr);
            await _context.SaveChangesAsync();

            return pr;
        }
        public async Task<List<PullRequest>> GetAll()
        {
            return await _context.PullRequests
                .Include(p => p.Reviewers)
                .ToListAsync();
        }


        public async Task<(PullRequest pr, string replacedBy)> Reassign(ReassignDto dto) 
        {
            var pr = await _context.PullRequests
                .Include(p => p.Reviewers)
                .Include(p => p.Author)
                .FirstOrDefaultAsync(p => p.Id == dto.PullRequestId); 

            if (pr == null)
                throw new Exception("PR_NOT_FOUND");

            if (pr.Status == PRStatus.MERGED)
                throw new Exception("PR_MERGED");

            var currentReviewers = pr.Reviewers.Select(r => r.ReviewerId).ToList();

            if (!currentReviewers.Contains(dto.OldUserId))
                throw new Exception("NOT_ASSIGNED");

            // 👉 берём автора → чтобы узнать команду
            var author = await _context.Users
                .FirstOrDefaultAsync(u => u.Id == pr.AuthorId);

            if (author == null)
                throw new Exception("AUTHOR_NOT_FOUND");

            // 👉 кандидаты
            var candidates = await _context.Users
                .Where(u =>
                    u.IsActive &&
                    u.TeamId == author.TeamId &&
                    u.Id != pr.AuthorId &&
                    !currentReviewers.Contains(u.Id)
                )
                .ToListAsync();

            if (!candidates.Any())
                throw new Exception("NO_CANDIDATE");

            var newReviewer = candidates
                .OrderBy(_ => Guid.NewGuid())
                .First();

            // 👉 удаляем старого
            var toRemove = pr.Reviewers
                .First(r => r.ReviewerId == dto.OldUserId);

            pr.Reviewers.Remove(toRemove);

            // 👉 добавляем нового
            pr.Reviewers.Add(new PullRequestReviewer
            {
                PullRequestId = pr.Id,
                ReviewerId = newReviewer.Id
            });

            await _context.SaveChangesAsync();

            return (pr, newReviewer.Id);
        }
        public async Task<PullRequest> Merge(MergeDto dto)
        {
            var pr = await _context.PullRequests
                .Include(p => p.Reviewers)
                .FirstOrDefaultAsync(p => p.Id == dto.PullRequestId);

            if (pr == null)
                throw new Exception("NOT_FOUND");

            // 👉 ИДЕМПОТЕНТНОСТЬ
            if (pr.Status == PRStatus.MERGED)
                return pr;

            pr.Status = PRStatus.MERGED;
            pr.MergedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return pr;
        }
    }
}
