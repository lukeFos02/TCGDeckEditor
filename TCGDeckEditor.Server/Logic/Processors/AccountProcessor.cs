using Microsoft.EntityFrameworkCore;
using TCGDeckEditor.Server.Models;

namespace TCGDeckEditor.Server.Logic.Processors;

public class AccountProcessor : IAccountProcessor
{
        private readonly ApplicationDbContext dbContext;
        private readonly string _pepper;
        private readonly int _iteration = 3;

        public AccountProcessor(ApplicationDbContext dbContext) 
        {
            this.dbContext = dbContext;
            this._pepper = Environment.GetEnvironmentVariable("PasswordHashPepper");
        }

        public async Task<bool> VerifyEmail(string email)
        {
            var account = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (account == null)
            {
                return true;
            }

            else return false;
        }

        public async Task<bool> RegisterAccount(User newAccount, CancellationToken cancellationToken) 
        {
            bool success = false;
            if (newAccount == null)
            {
                return success;
            }

            await dbContext.Users.AddAsync(newAccount, cancellationToken);
            await dbContext.SaveChangesAsync(cancellationToken);
            success = true;

            return success;
        }

        public async Task<User> VerifyLogin(string email, string password)
        {
            var account = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (account == null)
            {
                throw new Exception("Email or password did not match.");
            }

            var accountHash = PasswordHasher.ComputeHash(password, account.PasswordSalt, _pepper, _iteration);
            if (account.Password != accountHash)
            {
                throw new Exception("Email or password did not match.");
            }

            return account;
        }

        public async Task<User> ChangePassword(string email, string oldPassword, string newPassword)
        {
            var account = await dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            if (account != null)
            {
                string oldHash = PasswordHasher.ComputeHash(oldPassword, account.PasswordSalt, _pepper, _iteration);
                if (account.Password != oldHash) { throw new Exception("Old password does not match our records."); }

                account.Password = PasswordHasher.ComputeHash(newPassword, account.PasswordSalt, _pepper, _iteration);
                await dbContext.SaveChangesAsync();
            }

            return account;
        }
}

public interface IAccountProcessor
{
    Task<bool> VerifyEmail(string email);
    Task<bool> RegisterAccount(User newAccount, CancellationToken cancellationToken);
    Task<User> VerifyLogin(string email, string password);
    Task<User> ChangePassword(string email, string oldPassword, string newPassword);
}