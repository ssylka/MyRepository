namespace PVZ_ASP.Models.Dto
{
    using System.Text.Json.Serialization;

    public class ReassignDto
    {
        [JsonPropertyName("pull_request_id")]
        public string PullRequestId { get; set; }

        [JsonPropertyName("old_user_id")]
        public string OldUserId { get; set; }
    }
}
