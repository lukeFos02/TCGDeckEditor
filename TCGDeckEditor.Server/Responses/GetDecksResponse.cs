using TCGDeckEditor.Server.Models;

namespace TCGDeckEditor.Server.Responses;

public class GetDecksResponse
{
    public int DeckId { get; set; }
    public string DeckName { get; set; }
    public Card Leader { get; set; }
    public List<Card> DeckContents { get; set; }
}