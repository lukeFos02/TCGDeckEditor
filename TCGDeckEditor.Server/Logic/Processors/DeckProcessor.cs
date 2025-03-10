using Newtonsoft.Json;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Requests;

namespace TCGDeckEditor.Server.Logic.Processors;

public class DeckProcessor : IDeckProcessor
{
    private readonly ApplicationDbContext dbContext;

    public DeckProcessor(ApplicationDbContext dbContext)
    {
        this.dbContext = dbContext;
    }
    
    public async Task<bool> SaveDeck(SaveDeckRequest request)
    {
        try
        {
            await using (var context = this.dbContext)
            {
                var deck = new Deck()
                {
                    DeckName = request.DeckName,
                    UserId = request.UserId,
                    DeckLeader = JsonConvert.SerializeObject(request.Leader),
                    DeckContents = JsonConvert.SerializeObject(request.Deck)
                };
                await context.Decks.AddAsync(deck);
                await context.SaveChangesAsync();
            }
            
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}

public interface IDeckProcessor
{
    Task<bool> SaveDeck(SaveDeckRequest request);
}