namespace PVZ_ASP.Models
{
    public class PullRequestReviewer
    {
        public string PullRequestId { get; set; }
        public PullRequest PullRequest { get; set; }

        public string ReviewerId { get; set; }
        public User Reviewer { get; set; }
    }
}
