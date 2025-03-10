using Microsoft.EntityFrameworkCore;
using TCGDeckEditor.Server.Models;

namespace TCGDeckEditor.Server
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Deck> Decks { get; set; }
        public DbSet<DeckComment> DeckComments { get; set; }
    }
}
