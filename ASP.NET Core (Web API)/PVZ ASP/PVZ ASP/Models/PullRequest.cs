namespace PVZ_ASP.Models
{
    public enum PRStatus
    {
        OPEN,
        MERGED
    }
    public class PullRequest
    {
        public string Id { get; set; }
        public string Title { get; set; }

        public string AuthorId { get; set; }
        public User Author { get; set; }

        public PRStatus Status { get; set; } = PRStatus.OPEN;
        public DateTime? CreatedAt { get; set; }
        public DateTime? MergedAt { get; set; }
        public List<PullRequestReviewer> Reviewers { get; set; } = new();
    }
}
