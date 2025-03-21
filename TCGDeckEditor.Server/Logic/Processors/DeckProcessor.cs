using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TCGDeckEditor.Server.Models;
using TCGDeckEditor.Server.Requests;
using TCGDeckEditor.Server.Responses;

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
                var existingDeck = await context.Decks.FirstOrDefaultAsync(x => x.UserId == request.UserId
                                                                        && x.DeckName == request.DeckName);
                if (existingDeck != null)
                {
                    existingDeck.DeckName = request.DeckName;
                    existingDeck.UserId = request.UserId;
                    existingDeck.DeckLeader = JsonConvert.SerializeObject(request.Leader);
                    existingDeck.DeckContents = JsonConvert.SerializeObject(request.Deck);
                }
                else
                {
                    var deck = new Deck()
                    {
                        DeckName = request.DeckName,
                        UserId = request.UserId,
                        DeckLeader = JsonConvert.SerializeObject(request.Leader),
                        DeckContents = JsonConvert.SerializeObject(request.Deck)
                    };
                    await context.Decks.AddAsync(deck);
                }
                await context.SaveChangesAsync();
            }
            
            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<List<GetDecksResponse>> GetDecks(int userId)
    {
        await using var context = this.dbContext;
        
        var decks = context.Decks.Where(x => x.UserId == userId).ToList();
        return decks.Select(deck => new GetDecksResponse()
        {
            DeckId = deck.DeckId,
            DeckName = deck.DeckName,
            Leader = JsonConvert.DeserializeObject<Card>(deck.DeckLeader),
            DeckContents = JsonConvert.DeserializeObject<List<Card>>(deck.DeckContents)
        }).ToList();
    }
}

public interface IDeckProcessor
{
    Task<bool> SaveDeck(SaveDeckRequest request);
    Task<List<GetDecksResponse>> GetDecks(int userId);
}