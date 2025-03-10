namespace TCGDeckEditor.Server.Responses;

public class LoginResponse
{
    public int UserId { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
}