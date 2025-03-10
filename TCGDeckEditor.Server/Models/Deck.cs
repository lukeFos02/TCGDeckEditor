using System.ComponentModel.DataAnnotations.Schema;

namespace TCGDeckEditor.Server.Models
{
    public class Deck
    {
        public int DeckId { get; set; }
        public required string DeckName { get; set; }
        public required string? DeckLeader { get; set; }
        public required string? DeckContents { get; set; }
        
        [ForeignKey(nameof(User.UserId))]
        public int UserId { get; set; }
    }
}
