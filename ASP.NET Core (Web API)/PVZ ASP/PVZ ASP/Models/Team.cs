namespace PVZ_ASP.Models
{
    public class Team
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public List<User> Users { get; set; }
    }
}
