namespace PVZ_ASP.Models.Dto
{
    using System.Text.Json.Serialization;

    public class MergeDto
    {
        [JsonPropertyName("pull_request_id")]
        public string PullRequestId { get; set; }
    }
}
