using System.Text.Json.Serialization;

namespace PVZ_ASP.Models.Dto
{
    public class CreateTeamDto
    {
        [JsonPropertyName("team_name")]
        public string TeamName { get; set; }
        [JsonPropertyName("members")]
        public List<TeamMemberDto> Members { get; set; }
    }

    public class TeamMemberDto
    {
        [JsonPropertyName("user_id")]
        public string UserId { get; set; }

        [JsonPropertyName("username")]
        public string Username { get; set; }

        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; }
    }
}
