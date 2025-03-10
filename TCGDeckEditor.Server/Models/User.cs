namespace TCGDeckEditor.Server.Models
{
    public class User
    {
        public int UserId { get; set; }
        public required string UserName { get; set; }
        public required string Password { get; set; }
        public required string PasswordSalt { get; set; }
        public required string Email { get; set; }
    }
}
