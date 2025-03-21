namespace TCGDeckEditor.Server.Requests;

public class SearchCardsRequest
{
    public string? name { get; set; }
    public string? color { get; set; }
    public int? counter { get; set; }
    public int? cost { get; set; }
    public int? power { get; set; }
    public string? family { get; set; }
}