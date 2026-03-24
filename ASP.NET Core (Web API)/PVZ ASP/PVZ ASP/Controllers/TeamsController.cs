using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVZ_ASP.Data;
using PVZ_ASP.Models;
using PVZ_ASP.Models.Dto;


namespace PVZ_ASP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeamsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTeams()
        {
            var teams = await _context.Teams
                .Include(t => t.Users)
                .ToListAsync();

            var result = teams.Select(t => new
            {
                team_name = t.Name,
                members = t.Users.Select(u => new
                {
                    user_id = u.Id,
                    username = u.Name,
                    is_active = u.IsActive
                })
            });

            return Ok(result);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTeam([FromBody] CreateTeamDto dto)
        {
            var exists = await _context.Teams.AnyAsync(t => t.Name == dto.TeamName);
            if (exists)
                return BadRequest(new { error = "TEAM_EXISTS" });

            var team = new Team
            {
                Id = Guid.NewGuid().ToString(),
                Name = dto.TeamName,
                Users = dto.Members.Select(m => new User
                {
                    Id = m.UserId,
                    Name = m.Username,
                    IsActive = m.IsActive,
                    TeamId = null // EF сам проставит
                }).ToList()
            };

            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            return StatusCode(201, new
            {
                team = new
                {
                    team_name = team.Name,
                    members = team.Users.Select(u => new
                    {
                        user_id = u.Id,
                        username = u.Name,
                        is_active = u.IsActive
                    })
                }
            });
        }
    }
}
