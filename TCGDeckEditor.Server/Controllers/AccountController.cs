using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TCGDeckEditor.Server.Logic;
using TCGDeckEditor.Server.Logic.Processors;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Requests;
using TCGDeckEditor.Server.Responses;
using RegisterRequest = TCGDeckEditor.Server.Requests.RegisterRequest;

namespace TCGDeckEditor.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly IAccountProcessor accountProcessor;
    private readonly string _pepper;
    private readonly int _iteration = 3;

    public AccountController(IAccountProcessor accountProcessor)
    {
        this.accountProcessor = accountProcessor;
        this._pepper = Environment.GetEnvironmentVariable("PasswordHashPepper");
    }

    [HttpGet]
    [Route("verify-email")]
    public async Task<bool> VerifyEmail(string email)
    {
        bool success = false;
        success = await accountProcessor.VerifyEmail(email);
        return success;
    }

    [HttpPost]
    [Route("register-account")]
    public async Task<bool> RegisterAccount(RegisterRequest request, CancellationToken cancellationToken)
    {
        bool success = false;
        string salt = PasswordHasher.GenerateSalt();

        User newUser = new User(){
            Email = request.Email,
            PasswordSalt = salt,
            Password = PasswordHasher.ComputeHash(request.Password, salt, _pepper, _iteration),
            UserName = request.Username,
        };

        success = await accountProcessor.RegisterAccount(newUser, cancellationToken);

        return success;
    }

    [HttpPost]
    [Route("verify-login")]
    public async Task<LoginResponse> VerifyLogin(LoginRequest request)
    {
        User user = await accountProcessor.VerifyLogin(request.Email, request.Password);
        LoginResponse response = new LoginResponse();
        response.UserId = user.UserId;
        response.Email = user.Email;
        response.UserName = user.UserName;

        return response;
    }

    [HttpPost]
    [Route("change-password")]
    public async Task<User> ChangePassword(ChangePasswordRequest request)
    {
        return await accountProcessor.ChangePassword(request.Email, request.OldPassword, request.NewPassword);
    }
}
