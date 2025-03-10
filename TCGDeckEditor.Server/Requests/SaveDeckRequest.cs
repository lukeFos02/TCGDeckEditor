using TCGDeckEditor.Server.Models;

namespace TCGDeckEditor.Server.Requests;

public class SaveDeckRequest
{
    public required Card Leader { get; set; }
    public required List<Card> Deck { get; set; }
    public int UserId { get; set; }
    public required string DeckName { get; set; }
}