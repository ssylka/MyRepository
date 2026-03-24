using global::PVZ_ASP.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVZ_ASP.Data;
using PVZ_ASP.Models;

namespace PVZ_ASP.Controllers
{


    namespace PVZ_ASP.Controllers
    {
        [ApiController]
        [Route("api/[controller]")]
        public class UsersController : ControllerBase
        {
            private readonly AppDbContext _context;

            public UsersController(AppDbContext context)
            {
                _context = context;
            }
            [HttpGet]
            public async Task<ActionResult<List<User>>> GetUsers()
            {
                var _users = await _context.Users.Include(u => u.Team).ToListAsync();
                var result = _users.Select(u => new User
                {
                    Id = u.Id,
                    Name = u.Name,
                    IsActive = u.IsActive,
                    TeamId = u.TeamId,
                    Team = new Team
                    {
                        Id = u.Team.Id,
                        Name = u.Team.Name
                    }
                }).ToList();
                return result;
            }
            [HttpPost]
            public async Task<ActionResult<User>> CreateUser([FromBody] User user)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(user);
            }
        }
    }
}


