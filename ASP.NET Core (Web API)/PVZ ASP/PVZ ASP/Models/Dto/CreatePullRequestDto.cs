namespace PVZ_ASP.Models.Dto
{
    //public class CreatePullRequestDto
    //{
    //    public string PullRequestId { get; set; }
    //    public string PullRequestName { get; set; }
    //    public string AuthorId { get; set; }
    //}
    using System.Text.Json.Serialization;

    public class CreatePullRequestDto
    {
        [JsonPropertyName("pull_request_id")]
        public string PullRequestId { get; set; }

        [JsonPropertyName("pull_request_name")]
        public string PullRequestName { get; set; }

        [JsonPropertyName("author_id")]
        public string AuthorId { get; set; }
    }
}
