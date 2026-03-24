namespace PVZ_ASP.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }

        public string? TeamId { get; set; }
        public Team Team { get; set; }
    }
}
