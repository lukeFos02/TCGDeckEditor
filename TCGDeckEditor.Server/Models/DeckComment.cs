using System.ComponentModel.DataAnnotations.Schema;

namespace TCGDeckEditor.Server.Models
{
    public class DeckComment
    {
        public int DeckCommentId { get; set; }
        public required string UserComment { get; set; }
        public DateTime DateTime { get; set; }

        [ForeignKey(nameof(User.UserId))]
        public int UserId { get; set; }

        [ForeignKey(nameof(Deck.DeckId))]
        public int DeckId { get; set; }
    }
}
