using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PVZ_ASP.Models.Dto;
using PVZ_ASP.Services;

namespace PVZ_ASP.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PullRequestsController : ControllerBase
    {
        private readonly PullRequestService _service;

        public PullRequestsController(PullRequestService service)
        {
            _service = service;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreatePullRequestDto dto)
        {
            var pr = await _service.CreatePR(dto);
            return StatusCode(201, new
            {
                pr = new
                {
                    pull_request_id = pr.Id,
                    pull_request_name = pr.Title,
                    author_id = pr.AuthorId,
                    status = pr.Status.ToString(),
                    created_at = pr.CreatedAt,
                    merged_at = pr.MergedAt,
                    assigned_reviewers = pr.Reviewers
                    .Select(r => r.ReviewerId)
                    .ToList()
                }
            });

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var prs = await _service.GetAll();

            var result = prs.Select(pr => new
            {
                pull_request_id = pr.Id,
                pull_request_name = pr.Title,
                author_id = pr.AuthorId,
                status = pr.Status.ToString(),
                created_at = pr.CreatedAt,
                merged_at = pr.MergedAt,
                assigned_reviewers = pr.Reviewers
                .Select(r => r.ReviewerId)
                .ToList()
            });

            return StatusCode(201, result);
        }

        [HttpPost("reassign")]
        public async Task<IActionResult> Reassign([FromBody] ReassignDto dto)
        {
            try
            {
                var (pr, replacedBy) = await _service.Reassign(dto);

                return Ok(new
                {
                    pr = new
                    {
                        pull_request_id = pr.Id,
                        pull_request_name = pr.Title,
                        author_id = pr.AuthorId,
                        status = pr.Status.ToString(),
                        assigned_reviewers = pr.Reviewers
                            .Select(r => r.ReviewerId)
                            .ToList()
                    },
                    replaced_by = replacedBy
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = ex.Message
                });
            }
        }

        [HttpPost("merge")]
        public async Task<IActionResult> Merge([FromBody] MergeDto dto)
        {
            try
            {
                var pr = await _service.Merge(dto);

                return Ok(new
                {
                    pr = new
                    {
                        pull_request_id = pr.Id,
                        pull_request_name = pr.Title,
                        author_id = pr.AuthorId,
                        status = pr.Status.ToString(),
                        assigned_reviewers = pr.Reviewers
                            .Select(r => r.ReviewerId)
                            .ToList(),
                        createdAt = pr.CreatedAt,
                        mergedAt = pr.MergedAt
                    }
                });
            }
            catch (Exception)
            {
                return NotFound(new
                {
                    error = "NOT_FOUND"
                });
            }
        }
    }
}