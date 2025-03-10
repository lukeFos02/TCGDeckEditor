using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TCGDeckEditor.Server.Migrations
{
    /// <inheritdoc />
    public partial class updatedeck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DeckLeader",
                table: "Decks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeckLeader",
                table: "Decks");
        }
    }
}
